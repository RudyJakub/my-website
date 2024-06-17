FROM python:3.8.10-slim

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt
