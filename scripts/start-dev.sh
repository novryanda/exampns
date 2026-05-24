#!/usr/bin/env bash
# Start ExamCPNS local dev stack (PostgreSQL + API + Frontend)
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck source=/dev/null
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

PG_BIN="${PG_BIN:-$HOME/pgsql-root/usr/lib/postgresql/16/bin}"
PGDATA="${PGDATA:-$HOME/pgsql-data}"
export LD_LIBRARY_PATH="${LD_LIBRARY_PATH:-$HOME/pgsql-root/usr/lib/x86_64-linux-gnu:$HOME/pgsql-root/usr/lib/postgresql/16/lib}"

if [ -x "$PG_BIN/pg_ctl" ]; then
  if ! "$PG_BIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1; then
    echo "Starting PostgreSQL..."
    "$PG_BIN/pg_ctl" -D "$PGDATA" -l "$HOME/pgsql.log" -o "-p 5432" start
    sleep 2
  fi
elif command -v docker >/dev/null 2>&1; then
  echo "Starting Docker Compose (postgres + redis)..."
  docker compose -f "$ROOT/docker-compose.yml" up -d
else
  echo "PostgreSQL not found. Install Docker or run SETUP-LOCAL.md steps."
  exit 1
fi

echo "Starting API on :3001..."
(cd "$ROOT/apps/api" && npm run start:dev) &
API_PID=$!

echo "Starting frontend on :3000..."
(cd "$ROOT/apps/fe-exampns" && npm run dev) &
FE_PID=$!

trap 'kill $API_PID $FE_PID 2>/dev/null' INT TERM

echo "ExamCPNS running. API PID=$API_PID FE PID=$FE_PID"
echo "  Frontend: http://localhost:3000"
echo "  API:      http://localhost:3001/api/v1/health"
wait
