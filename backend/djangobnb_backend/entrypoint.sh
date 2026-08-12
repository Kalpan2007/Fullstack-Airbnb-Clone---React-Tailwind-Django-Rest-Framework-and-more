#!/bin/sh

set -e

echo "=== Entrypoint started ==="
echo "DATABASE_URL set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"
echo "DEBUG: $DEBUG"

echo "=== Running migrations ==="
python manage.py migrate --noinput 2>&1

echo "=== Collecting static files ==="
python manage.py collectstatic --noinput 2>&1

echo "=== Starting Daphne ==="
exec daphne -b 0.0.0.0 -p ${PORT:-8000} djangobnb_backend.asgi:application
