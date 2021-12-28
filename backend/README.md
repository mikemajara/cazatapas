# PostgreSQL and pgAdmin with Docker Compose

## Requirements

* [Docker](https://www.docker.com/).
* [Docker Compose](https://docs.docker.com/compose/install/).

## Quick start

Clone this repo, create `.env` and start the db with Docker Compose:

```bash
git clone https://github.com/eescriba/postgres-docker.git
cd postgres-docker
cp .env.sample .env
docker-compose up -d
```

## PgAdmin

Access to PostgreSQL web administration: http://localhost:5050

## Environment

* `POSTGRES_USER` 
* `POSTGRES_PASSWORD` 
* `POSTGRES_DB`
* `PGADMIN_DEFAULT_EMAIL` 
* `PGADMIN_DEFAULT_PASSWORD` 

