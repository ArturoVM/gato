package games

import (
	"errors"
	"log"

	"strconv"

	"../files"
	"github.com/google/flatbuffers/go"
)

// GameObject es la representación de runtime de juego
type GameObject struct {
	ID      string
	A       []int32
	B       []int32
	C       []int32
	PlayerX string
	PlayerO string
}

// NewGame inicializa un objeto de juego nuevo
func NewGame(id string) *GameObject {
	return &GameObject{
		ID:      id,
		A:       make([]int32, 3),
		B:       make([]int32, 3),
		C:       make([]int32, 3),
		PlayerX: "",
		PlayerO: "",
	}
}

// LoadGame carga un flatbuffer a un objeto
func LoadGame(id string) (*GameObject, error) {
	data, err := files.OpenGame(id)
	if err != nil {
		return nil, err
	}
	log.Printf("data len at load: %d", len(data))
	game := GetRootAsGame(data, 0)
	a := make([]int32, 3)
	for i := 0; i < 2; i++ {
		a[i] = game.A(i)
	}
	b := make([]int32, 3)
	for i := 0; i < 2; i++ {
		b[i] = game.B(i)
	}
	c := make([]int32, 3)
	for i := 0; i < 2; i++ {
		c[i] = game.C(i)
	}
	return &GameObject{
		ID:      string(game.Id()),
		A:       a,
		B:       b,
		C:       c,
		PlayerX: string(game.PlayerX()),
		PlayerO: string(game.PlayerO()),
	}, nil
}

// Save guarda el objeto a un flatbuffer
func (g *GameObject) Save() error {
	bld := flatbuffers.NewBuilder(0)
	gameID := bld.CreateString(g.ID)

	GameStartAVector(bld, 3)
	populateVector(bld, g.A)
	a := bld.EndVector(3)

	GameStartBVector(bld, 3)
	populateVector(bld, g.B)
	b := bld.EndVector(3)

	GameStartCVector(bld, 3)
	populateVector(bld, g.C)
	c := bld.EndVector(3)

	playerOID := bld.CreateString(g.PlayerO)
	playerXID := bld.CreateString(g.PlayerX)

	GameStart(bld)
	GameAddId(bld, gameID)
	GameAddA(bld, a)
	GameAddB(bld, b)
	GameAddC(bld, c)
	GameAddPlayerO(bld, playerOID)
	GameAddPlayerX(bld, playerXID)
	game := GameEnd(bld)

	bld.Finish(game)

	log.Printf("data len at save: %d", len(bld.FinishedBytes()))

	return files.WriteGame(g.ID, bld.FinishedBytes())
}

func populateVector(b *flatbuffers.Builder, vec []int32) {
	for i := 2; i >= 0; i-- {
		b.PrependInt32(vec[i])
	}
}

// FindPlayerForID determina a quién corresponde la id
func (g *GameObject) FindPlayerForID(id string) (string, error) {
	if g.PlayerO == id {
		return "O", nil
	}
	if g.PlayerX == id {
		return "X", nil
	}
	return "", errors.New("No estás jugando en este juego.")
}

// PerformMove intenta hacer un movimiento en el tablero
func (g *GameObject) PerformMove(move string, player string) bool {
	var playerToken int32

	if player == "O" {
		playerToken = TokO
	}
	if player == "X" {
		playerToken = TokX
	}

	moveRunes := []rune(move)

	row := moveRunes[0]
	column, err := strconv.Atoi(string(moveRunes[1]))
	if err != nil {
		return false
	}

	switch row {
	case 'A':
		return makeMove(g.A, column, playerToken)
	case 'B':
		return makeMove(g.B, column, playerToken)
	case 'C':
		return makeMove(g.C, column, playerToken)
	}

	return false
}

func makeMove(row []int32, column int, token int32) bool {
	if row[column] != TokNone {
		return false
	}
	row[column] = token
	return true
}
