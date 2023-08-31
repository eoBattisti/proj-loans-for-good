# Stage 1: Build stage
FROM python:3.10-alpine AS builder

ENV PIP_NO_CACHE_DIR off
ENV PIP_DISABLE_PIP_VERSION_CHECK on
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV COLUMN 80

RUN mkdir /setup
WORKDIR /setup/

  RUN apk update && apk add --no-cache  gcc libpq  postgresql-dev musl-dev build-base python3-dev

COPY . /setup/
RUN sh ./docker/start.sh


# Stage 2: Final runtime stage
FROM python:3.10-alpine

RUN apk update && apk add libpq postgresql-client
COPY --from=builder /usr/local/lib/python3.10/site-packages/ /usr/local/lib/python3.10/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/
COPY --from=builder /setup /app

WORKDIR /app

EXPOSE 9000
STOPSIGNAL SIGINT
