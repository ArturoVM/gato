#!/bin/sh

env GOOS=linux GOARCH=amd64 gb build
webpack --progress --colors
