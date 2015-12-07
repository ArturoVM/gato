# Package Documentation

## Constants

```golang
const (
    TokNone = 0
    TokX    = 1
    TokO    = 2
)
```

## Functions

`CheckBoardFull` se encarga de revisar condición de "gato"
```golang
func CheckBoardFull(game *GameObject) bool
```

`CheckVictory` verifica si el último movimiento es ganador

```golang
func CheckVictory(tile string, game *GameObject) bool
```

`TryJoinGame` intenta unirse a un juego existente, o crear uno nuevo

```golang
func TryJoinGame(code string, socketid string) (id, jugador string, err error)
```

## Types

`GameObject` es la representación de runtime de juego

``` golang
type GameObject struct {
    ID      string
    A       []int8
    B       []int8
    C       []int8
    PlayerX string
    PlayerO string
}
```

`LoadGame` carga un flatbuffer a un objeto

```golang
func LoadGame(id string) (*GameObject, error)
```

`NewGame` inicializa un objeto de juego nuevo

```golang
func NewGame(id string) *GameObject
```

`FindPlayerForID` determina a quién corresponde la id

```golang
func (g *GameObject) FindPlayerForID(id string) (string, error)
```

`PerformMove` intenta hacer un movimiento en el tablero

```golang
func (g *GameObject) PerformMove(move string, player string) bool
```

`Save` guarda el objeto a un flatbuffer

```golang
func (g *GameObject) Save() error
```

`Move` representa un movimiento de algún jugador

```golang
type Move struct {
    Tile string `json:"tile"`
    Game string `json:"game"`
}
```
