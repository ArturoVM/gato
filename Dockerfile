FROM golang:latest

MAINTAINER Arturo Vergara <hello@arturovm.me>

RUN mkdir -p /gato
COPY src /gato/src
COPY vendor /gato/vendor
RUN go get github.com/constabulary/gb/...
WORKDIR /gato
RUN gb build
COPY static static
ENTRYPOINT ["bin/gato"]
EXPOSE 4286
