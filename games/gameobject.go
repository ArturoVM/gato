package games

import (
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
	playerXID := bld.CreateString(g.PlayerX)
	playerOID := bld.CreateString(g.PlayerO)
	GameStartAVector(bld, 3)
	populateVector(bld, g.A)
	a := bld.EndVector(3)
	GameStartBVector(bld, 3)
	populateVector(bld, g.B)
	b := bld.EndVector(3)
	GameStartBVector(bld, 3)
	populateVector(bld, g.C)
	c := bld.EndVector(3)

	GameStart(bld)
	GameAddId(bld, gameID)
	GameAddA(bld, a)
	GameAddB(bld, b)
	GameAddC(bld, c)
	GameAddPlayerX(bld, playerXID)
	GameAddPlayerO(bld, playerOID)
	game := GameEnd(bld)

	bld.Finish(game)

	return files.WriteGame(g.ID, bld.Bytes[bld.Head():])
}

func populateVector(b *flatbuffers.Builder, vec []int32) {
	for i := 2; i >= 0; i-- {
		b.PrependUOffsetT(flatbuffers.UOffsetT(vec[i]))
	}
}
