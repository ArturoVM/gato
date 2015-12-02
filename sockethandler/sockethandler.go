package sockethandler

import (
    "github.com/googollee/go-socket.io"
    "log"
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

    socket.On("join game", func() {
        log.Println("unir a juego");
    })
    socket.On("try move", func() {})
}
