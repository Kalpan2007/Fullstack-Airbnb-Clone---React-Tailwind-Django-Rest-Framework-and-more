#!/bin/sh

set -e

echo "Running entrypoint..."

# Wait for database if using PostgreSQL
if [ -n "$DATABASE_URL" ] || [ "$DATABASE" = "postgres" ]; then
    # Extract host and port from DATABASE_URL or individual vars
    if [ -n "$DATABASE_URL" ]; then
        DB_HOST=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:]*\):\([0-9]*\).*|\1|p')
        DB_PORT=$(echo "$DATABASE_URL" | sed -n 's|.*@\([^:]*\):\([0-9]*\).*|\2|p')
    else
        DB_HOST=$SQL_HOST
        DB_PORT=$SQL_PORT
    fi

    echo "Waiting for database at $DB_HOST:$DB_PORT..."
    while ! nc -z "$DB_HOST" "$DB_PORT"; do
        sleep 0.1
    done
    echo "Database is up and running."
fi

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
exec "$@"
