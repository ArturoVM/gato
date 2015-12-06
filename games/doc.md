# PACKAGE DOCUMENTATION

## CONSTANTS

    const (
        TokNone = 0
        TokX    = 1
        TokO    = 2
    )

FUNCTIONS

CheckBoardFull se encarga de revisar condición de "gato"
    func CheckBoardFull(game *GameObject) bool

CheckVictory verifica si el último movimiento es ganador
    func CheckVictory(tile string, game *GameObject) bool

TryJoinGame intenta unirse a un juego existente, o crear uno nuevo
returns: id de juego, jugador, error
    func TryJoinGame(code string, socketid string) (id, jugador string, err error)

## TYPES

GameObject es la representación de runtime de juego
    type GameObject struct {
        ID      string
        A       []int8
        B       []int8
        C       []int8
        PlayerX string
        PlayerO string
    }

LoadGame carga un flatbuffer a un objeto
    func LoadGame(id string) (*GameObject, error)

NewGame inicializa un objeto de juego nuevo
    func NewGame(id string) *GameObject

FindPlayerForID determina a quién corresponde la id
    func (g *GameObject) FindPlayerForID(id string) (string, error)

PerformMove intenta hacer un movimiento en el tablero
    func (g *GameObject) PerformMove(move string, player string) bool

Save guarda el objeto a un flatbuffer
    func (g *GameObject) Save() error

Move representa un movimiento de algún jugador
    type Move struct {
        Tile string `json:"tile"`
        Game string `json:"game"`
    }
