# Package Documentation

## Functions

`DeleteGame` elimina el archivo con el flatbuffer de un juego

```golang
func DeleteGame(id string) error
```

`GameExists` verifica que un juego exista

```golang
func GameExists(id string) bool
```

`OpenGame` lee un archivo de flatbuffer y lo carga un slice de bytes

```golang
func OpenGame(id string) ([]byte, error)
```

`WriteGame` escribe un slice de bytes a un archivo

```golang
func WriteGame(id string, gamedata []byte) error
```
