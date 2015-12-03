package games

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"math/big"
	"os"
	"strconv"
	"strings"
)

type diagCase int

const (
	topLeft diagCase = iota
	topRight
	center
	bottomLeft
	bottomRight
)

// TryJoinGame intenta unirse a un juego existente, o crear uno nuevo
// returns: id de juego, jugador, error
func TryJoinGame(code string, socketid string) (id, jugador string, err error) {
	if strings.Trim(code, " \t\n") != "" { // el usuario pasó un código
		game, err := LoadGame(code)
		if err != nil { // el juego no existe o se pudo leer
			if os.IsNotExist(err) {
				err = fmt.Errorf("El juego %s no existe", code)
				return id, jugador, err
			}
			err = fmt.Errorf("¡Oops! No sabemos lo que pasó")
			return id, jugador, err
		}
		// el juego sí existe y sí se pudo leer
		id = code
		jugador = "O"

		if game.PlayerX != "" && game.PlayerO != "" {
			err = fmt.Errorf("¡Este juego ya está lleno!")
			return id, jugador, err
		}
		game.PlayerO = socketid // agregar usuario al juego
		game.Save()

		return id, jugador, err
	}
	// el usuario no pasó un código y se va a generar un nuevo juego
	id, err = createGame(socketid)
	if err != nil {
		err = fmt.Errorf("No pudimos crear un juego nuevo")
		return id, jugador, err
	}
	jugador = "X"
	return id, jugador, err
}

func createGame(player string) (string, error) {
	id, err := generateID()
	if err != nil {
		return "", err
	}

	game := NewGame(id)
	game.PlayerX = player

	err = game.Save()
	if err != nil {
		return "", err
	}

	return id, nil
}

func generateID() (string, error) {
	numericID, err := rand.Int(rand.Reader, big.NewInt(1000000000))
	if err != nil {
		return "", err
	}
	id := base64.URLEncoding.EncodeToString(numericID.Bytes())
	return id, nil
}

// CheckVictory verifica si el último movimiento es ganador
func CheckVictory(tile string, game *GameObject) bool {
	tileRunes := []rune(tile)
	rowRune := tileRunes[0]
	var rowNum int
	var row []byte
	columnNum, err := strconv.Atoi(string(tileRunes[1]))
	if err != nil {
		return false
	}

	switch rowRune {
	case 'A':
		rowNum = 0
		row = game.A
	case 'B':
		rowNum = 1
		row = game.B
	case 'C':
		rowNum = 2
		row = game.C
	}

	if checkRow(row, row[columnNum]) {
		return true
	}

	if checkColumn(game, columnNum, row[columnNum]) {
		return true
	}

	if shouldCheckDiag(columnNum, rowNum) {
		return checkDiag(game, columnNum, rowNum, row[columnNum])
	}

	return false
}

func checkRow(row []byte, token byte) bool {
	if row[0] == token && row[1] == token && row[2] == token {
		return true
	}
	return false
}

func checkColumn(game *GameObject, col int, token byte) bool {
	if game.A[col] == token && game.B[col] == token && game.C[col] == token {
		return true
	}
	return false
}

func checkDiag(game *GameObject, x, y int, token byte) bool {
	diag := whichDiagTile(x, y)
	switch diag {
	case topLeft, bottomRight:
		return checkBackSlash(game, token)
	case topRight, bottomLeft:
		return checkSlash(game, token)
	case center:
		return checkSlash(game, token) || checkBackSlash(game, token)
	}
	return false
}

func checkSlash(game *GameObject, token byte) bool {
	if game.A[2] == token && game.B[1] == token && game.C[0] == token {
		return true
	}
	return false
}

func checkBackSlash(game *GameObject, token byte) bool {
	if game.A[0] == token && game.B[1] == token && game.C[2] == token {
		return true
	}
	return false
}

func shouldCheckDiag(x, y int) bool {
	if x == 0 && y == 0 {
		return true
	}
	if x == 0 && y == 2 {
		return true
	}
	if x == 2 && y == 0 {
		return true
	}
	if x == 2 && y == 2 {
		return true
	}
	if x == 1 && y == 1 {
		return true
	}
	return false
}

func whichDiagTile(x, y int) diagCase {
	if x == 0 && y == 0 {
		return topLeft
	}
	if x == 0 && y == 2 {
		return bottomLeft
	}
	if x == 2 && y == 0 {
		return topRight
	}
	if x == 2 && y == 2 {
		return bottomRight
	}
	if x == 1 && y == 1 {
		return center
	}
	return center
}
