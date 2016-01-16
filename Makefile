# macros
GB := $(shell command -v gb)
WEBPACK := $(shell command -v webpack)

# default
all: app

# archivos requeridos
bin/gato:
ifndef GB
	$(error "gb no está instalado. Obtenlo en http://getgb.io")
endif
	gb build

bin/gato-linux-amd64:
ifndef GB
	$(error "gb no está instalado. Obtenlo en http://getgb.io")
endif
	env GOOS=linux GOARCH=amd64 gb build

static/js/app.js:
ifndef WEBPACK
	$(error "webpack no está instalado. Obtenlo en https://webpack.github.io")
endif
	webpack --progress --colors

# aliases
frontend: static/js/app.js
backend: bin/gato
backend_linux: bin/gato-linux-amd64

app: frontend backend

docker: frontend backend_linux
	docker build -t gato .

clean:
	rm -rf bin
	rm -rf pkg
	rm static/js/app.js
