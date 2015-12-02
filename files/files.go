package files

import (
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

var gamedir = "gamedata"

// OpenGame lee un archivo de flatbuffer y lo carga un slice de bytes
func OpenGame(id string) ([]byte, error) {
	filename := strings.Join([]string{id, ".gato"}, "")
	p := filepath.Join(gamedir, filename)
	return ioutil.ReadFile(p)
}

// WriteGame escribe un slice de bytes a un archivo
func WriteGame(id string, gamedata []byte) error {
	err := os.MkdirAll(gamedir, os.FileMode(0755))
	if err != nil {
		return err
	}
	filename := strings.Join([]string{id, ".gato"}, "")
	p := filepath.Join(gamedir, filename)
	return ioutil.WriteFile(p, gamedata, os.FileMode(0644))
}
