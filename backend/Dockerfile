FROM python:3.8-slim-buster AS build-env

ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION="1.0.2"

RUN set -ex \
    && apt-get update \
    && apt-get -y upgrade \
    && apt-get install -y libev-dev gcc curl git \
    && curl -sSL \
       https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python \
    && pip install --upgrade pip gunicorn \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/*

WORKDIR /usr/src/app

COPY ./pyproject.toml .
COPY ./poetry.lock .

RUN . $HOME/.poetry/env \
    && poetry config virtualenvs.create false \
    && poetry install --no-dev

FROM python:3.8-slim-buster

WORKDIR /usr/src/app

COPY --from=build-env /usr/local/bin/gunicorn /usr/local/bin/gunicorn
COPY --from=build-env /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages

COPY . .

EXPOSE 8080

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
