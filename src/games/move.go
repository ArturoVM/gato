package games

// Move representa un movimiento de algún jugador
type Move struct {
	Tile string `json:"tile"`
	Game string `json:"game"`
}
