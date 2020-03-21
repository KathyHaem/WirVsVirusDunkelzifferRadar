#!/bin/bash

/usr/local/bin/gunicorn --config gunicorn_config.py app:application
