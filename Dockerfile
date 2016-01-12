MAINTAINER Arturo Vergara <hello@arturovm.me>
FROM scratch

COPY static /static
COPY bin/gato-linux-amd64 /gato
EXPOSE 4286
CMD ["/gato"]
