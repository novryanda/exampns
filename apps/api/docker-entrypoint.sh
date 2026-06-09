#!/bin/sh
set -e

if [ "${RUN_DB_PUSH_ON_STARTUP:-false}" = "true" ]; then
  echo "[entrypoint] Running prisma db push..."
  npx prisma db push --skip-generate
fi

if [ "${RUN_MIGRATE_ON_STARTUP:-true}" = "true" ]; then
  echo "[entrypoint] Running prisma migrate deploy..."
  npx prisma migrate deploy
fi

exec "$@"
