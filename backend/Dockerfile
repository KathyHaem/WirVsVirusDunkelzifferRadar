FROM python:3.8-slim-buster

ENV PYTHONUNBUFFERED=1
ENV POETRY_VERSION="1.0.2"

RUN set -ex \
    && apt-get update \
    && apt-get -y upgrade \
    && apt-get install -y libev-dev gcc curl git \
    && apt-get install -y libpq-dev \
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

COPY . .

EXPOSE 8080

ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
