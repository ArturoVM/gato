package main

import (
    "log"
    "net/http"
    "github.com/googollee/go-socket.io"
    "./sockethandler"
)

func main() {
    io, err := socketio.NewServer(nil)
    if err != nil {
        log.Fatal(err)
    }

    sockethandler.HandleServer(io)

    http.Handle("/socket.io/", io)
    http.Handle("/", http.FileServer(http.Dir("./static")))
    log.Println("Escuchando en localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
