package sockethandler

import (
	"fmt"
	"log"
	"os"

	"../files"
	"../games"
	"github.com/googollee/go-socket.io"
)

// HandleServer se encarga de definir lo que se ejecuta
// en el servidor de socket.io
func HandleServer(server *socketio.Server) {
	server.On("connection", func(socket socketio.Socket) {
		log.Println("cliente conectado")
		regCommands(socket)
	})
}

func regCommands(socket socketio.Socket) {
	socket.On("disconnection", handleDisconnection)
	socket.On("join game", handleJoin)
	socket.On("try move", handleMove)
}

func handleDisconnection(socket socketio.Socket) {
	log.Println("cliente desconectado")
	for _, room := range socket.Rooms() {
		gameOver(socket, room, "Nadie")
	}
}

func handleJoin(socket socketio.Socket, code string) {
	log.Printf("uniéndose a juego %s", code)
	id, player, err := games.TryJoinGame(code, socket.Id())
	if err != nil {
		gameError(socket, err.Error())
		return
	}
	data := make(map[string]string)
	data["player"] = player
	data["code"] = id
	socket.Emit("joined game", data)
	socket.Join(id)
	if player == "O" {
		gameStarted(socket, id)
	}
}

func gameError(socket socketio.Socket, message string) {
	socket.Emit("game error", message)
}

func handleMove(socket socketio.Socket, move games.Move) {
	game, err := games.LoadGame(move.Game)
	if err != nil { // el juego no existe o se pudo leer
		if os.IsNotExist(err) {
			gameError(socket, fmt.Sprintf("El juego %s no existe", move.Game))
			return
		}
		gameError(socket, "¡Oops! No sabemos lo que pasó")
		return
	}
	player, err := game.FindPlayerForID(socket.Id())
	if err != nil {
		gameError(socket, err.Error())
	}
	success := game.PerformMove(move.Tile, player)
	if !success {
		gameError(socket, "¡Ese espacio ya está ocupado!")
		return
	}
	game.Save()
	result := make(map[string]string)
	result["move"] = move.Tile
	result["player"] = player
	madeMove(socket, game.ID, result)
}

func gameStarted(socket socketio.Socket, id string) {
	turn := make(map[string]string)
	turn["turn"] = "X"
	socket.Emit("game started", turn)
	socket.BroadcastTo(id, "game started", turn)
}

func gameOver(socket socketio.Socket, game, winner string) {
	socket.Emit("game over", winner)
	socket.BroadcastTo(game, "game over", winner)
	files.DeleteGame(game)
}

func madeMove(socket socketio.Socket, game string, move map[string]string) {
	socket.Emit("made move", move)
	socket.BroadcastTo(game, "made move", move)
}
