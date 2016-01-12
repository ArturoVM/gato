FROM scratch

MAINTAINER Arturo Vergara <hello@arturovm.me>

COPY static /static
COPY bin/gato-linux-amd64 /gato
CMD ["/gato"]
EXPOSE 4286
