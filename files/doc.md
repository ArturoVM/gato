# PACKAGE DOCUMENTATION

## FUNCTIONS

DeleteGame elimina el archivo con el flatbuffer de un juego
    func DeleteGame(id string) error

GameExists verifica que un juego exista
    func GameExists(id string) bool

OpenGame lee un archivo de flatbuffer y lo carga un slice de bytes
    func OpenGame(id string) ([]byte, error)

WriteGame escribe un slice de bytes a un archivo
    func WriteGame(id string, gamedata []byte) error
