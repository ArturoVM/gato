# Documentación

## Backend

El backend escucha en una conexión de sockets de TCP, manejada a través de un port de [socket.io](http://socket.io) para Go. Esta conexión recibe comandos, los procesa, y luego emite eventos.

### Packages

Cada uno de estos módulos contiene un archivo `doc.md` que se puede leer para conocer sus funciones públicas.

#### `sockethandler`

El módulo `sockethandler` se encarga de definir y mapear funciones a los distintos commandos que el cliente puede emitir.

Procesa una cierta porción de la lógica de juego. Específicamente, se dedica a administrar a los jugadores y sus conexiones.

#### `games`

Este módulo contiene definiciones de tipos que representan a los juegos en curso, así como funciones que actúan sobre instancias de esos tipos, para modificarlos de diversas maneras. Aquí se hace el procesamiento principal del gameplay.

##### `game.go`

Contiene código auto-generado por FlatBuffers. Aquí se encuentran funciones para serializar y des-serializar juegos para posteriormente escribirlos al disco.

##### `tok.go`

Contiene la definición de un tipo que representa al token que emplean los jugadores al hacer sus movimientos.

##### `gameobject.go`

Aquí se encuentra la definición de un tipo más apto para ser utilizado por Go. También se definen algunas funciones que modifican al tablero de juego a través de movimientos.

Así mismo, contiene funciones para traducir entre esta representación, y la representación generada por FlatBuffers.

##### `move.go`

Sólo define un tipo que se utilizar para representar un movimiento en el tablero de juego.

##### `manager.go`

En este módulo se encuentra el gameplay propiamente. Tiene varias funciones para revisar condiciones de victoria (o empate). También se encarga de incorporar jugadores a algún juego dado.

#### `files`

El módulo files define utilidades que se utilizan para escribir, leer y borrar juegos en el disco.

## Frontend

El frontend está implementado como una serie de módulos de JavaScript, que utilizan la sintaxis de ECMAScript 6. Estos módulos cumplen funciones variadas, como modificar la interfaz del juego, o comunicarse con el servidor.

### Módulos

#### `main.js`

Hace el set-up del juego, y mapea funciones a eventos del server. Este módulo contiene todas las computaciones del frontend (en contraste a los otros módulos, que únicamente definen funciones, salvo algunas inicializaciones de variables y constantes).

#### `ui.js`

Define funciones que formalizan a la interfaz del juego. Dibuja el tablero de juego, y provee herramientas para mostrar mensajes al jugador.

#### `gamedata.js`

Guarda meta-datos básicos del juego, necesarios para la comunicación con el servidor.

#### `broker.js`

Define una sencilla interfaz que el módulo principal utiliza para comunicarse con el servidor y enviarle comandos.