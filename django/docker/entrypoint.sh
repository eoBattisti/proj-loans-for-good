#!/bin/bash

echo "Generating Migrations"
python3 manage.py makemigrations
echo "Done!"

echo "Migrate..."
python3 manage.py migrate --noinput
echo "Migrated!"

echo "Loading fixtures..."
python3 manage.py loaddata */fixtures/*.json
echo "Done!"

echo "Starting celery.."
celery -A setup worker -l info -Q default --without-mingle --without-gossip \
-n default.%h --pidfile "/var/run/worker.pid" -f "/var/log/celery.log" &
echo "Done!"


python3 manage.py runserver 0.0.0.0:9000
