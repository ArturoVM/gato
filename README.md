# Gato

## Introducción

Juego de gato a distancia :)

Proyecto realizado como prueba técnica para la convocatoria de menteslibres.io.

## Para Compilar

### Pre-requisitos

* [Go](http://golang.org)
* [npm](https://nodejs.org/en/download/)
* [webpack](https://webpack.github.io/)
* [Babel](http://babeljs.io/docs/setup/#webpack)
* [flatbuffers](http://google.github.io/flatbuffers/)
* [go-socket.io](https://github.com/googollee/go-socket.io)

### Compilando…

Sólo es necesario ejecutar esto:

    $ cd gato
    $ go build -o gato main.go
    $ webpack --progress --colors

O bien, si uno cuenta con una máquina \*nix:

    $ cd gato
    $ sh build.sh

## Para Usar

Ejecuta el binario resultante de la compilación con Go, y en tu navegador, ve a [localhost:8080](http://localhost:8080). Puedes abrir dos pestañas con la misma URL para jugar contigo mismo.

## Arquitectura General

El juego consta de un frontend y un backend, que se comunican por medio de WebSockets, con la implementación de [socket.io](http://socket.io).

La interfaz está constituida por una combinación de elementos de HTML animados con JavaScript, y un elemento `canvas`, en el que se presenta el tablero de juego.

El backend se encarga de procesar a los jugadores, administrar las conexiones, y ejecutar la lógica de juego.

El código está en spanglish porque así pienso cuando programo :P Pero de ser un problema, puedo ajustarme por completo.

## Licencias

Este software está distribuido bajo la [licencia MIT](http://opensource.org/licenses/MIT).

Este proyecto contiene el siguiente software:

* [Semantic UI](https://github.com/Semantic-Org/Semantic-UI/blob/master/LICENSE.md)
* [JQuery](https://jquery.org/license/)
* [socket.io](https://github.com/socketio/socket.io/blob/master/LICENSE)
* [flatbuffers](https://github.com/google/flatbuffers/blob/master/LICENSE.txt)
* [go-socket.io](https://github.com/googollee/go-socket.io/blob/master/LICENSE)
