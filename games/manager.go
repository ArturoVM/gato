package games

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"math/big"
	"os"
	"strings"
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
