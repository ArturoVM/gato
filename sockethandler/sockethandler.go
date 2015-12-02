package sockethandler

import (
	"log"

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
	socket.On("disconnection", func() {
		log.Println("cliente desconectado")
	})

	socket.On("join game", func(code string) {
		log.Println("join game ", code)
		id, player, err := games.TryJoinGame(code, socket.Id())
		if err != nil {
			socket.Emit("game error", err.Error())
			return
		}
		data := make(map[string]string)
		data["player"] = player
		data["code"] = id
		socket.Emit("joined game", data)
		socket.Join(id)
		if player == "O" {
			socket.Emit("game started", "{ \"turn\": \"X\" }")
			socket.BroadcastTo(id, "game started", "{ \"turn\": \"X\" }")
		}
	})
	socket.On("try move", func() {})
}
