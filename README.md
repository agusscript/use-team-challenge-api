<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
   
# Use Team challenge

Collaborative board in real time with web sockets.

## Prerequisites (important)

- [Node >= 20](https://github.com/nvm-sh/nvm) | This project was developed using node version `20.18.3`
- [Docker](https://docs.docker.com/engine/install/) | You will need to have Docker installed to be able to launch the database (MySQL).

## Project setup

```sh
npm install
```

## Environment variables

```sh
NODE_ENV=
PORT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_ROOT_PASSWORD=
DB_NAME=
GLOBAL_PREFIX=
```

## Run the Docker image with the DB

```sh
docker compose up -d
```

## Compile and run the project

```sh
# development
npm run start

# watch mode
npm run start:dev
```