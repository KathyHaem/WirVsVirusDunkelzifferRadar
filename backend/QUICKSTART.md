# Quickstart
## With Docker

 * Install [docker](https://docs.docker.com/).
 * Install [docker-compose](https://docs.docker.com/compose/install/).
 * Make sure the [backend/credentials](backend/credentials) directory exists and contains the files _client-cert.pem_ and _client-key.pem_.
 * Run `docker-compose up`
 
## With Pyenv + Poetry
 * Install [pyenv](https://github.com/pyenv/pyenv) with [pyenv-installer](https://github.com/pyenv/pyenv-installer).
 * Run `pyenv install 3.8.2`
 * Install [poetry](https://python-poetry.org) by running `curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python`
 * Move to the [backend directory](backend).
 * Run `poetry install`
 * Run `poetry run python app.py`