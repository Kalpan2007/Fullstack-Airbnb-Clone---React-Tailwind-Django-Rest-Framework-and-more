#!/bin/bash

set -e

echo "=== Entrypoint started ==="
echo "DATABASE_URL set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"
echo "PORT: ${PORT:-8000}"

echo "=== Running migrations ==="
python manage.py migrate --noinput

echo "=== Collecting static files ==="
python manage.py collectstatic --noinput

echo "=== Starting Daphne on port ${PORT:-8000} ==="
daphne -b 0.0.0.0 -p ${PORT:-8000} djangobnb_backend.asgi:application
