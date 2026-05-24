#!/usr/bin/env bash
# Start user-space PostgreSQL (installed via apt download + extract)
set -euo pipefail

PG_BIN="${PG_BIN:-$HOME/pgsql-root/usr/lib/postgresql/16/bin}"
PGDATA="${PGDATA:-$HOME/pgsql-data}"
export LD_LIBRARY_PATH="${LD_LIBRARY_PATH:-$HOME/pgsql-root/usr/lib/x86_64-linux-gnu:$HOME/pgsql-root/usr/lib/postgresql/16/lib}"

if [ ! -x "$PG_BIN/pg_ctl" ]; then
  echo "PostgreSQL binaries not found at $PG_BIN"
  echo "See SETUP-LOCAL.md or run: docker compose up -d"
  exit 1
fi

if "$PG_BIN/pg_ctl" -D "$PGDATA" status >/dev/null 2>&1; then
  echo "PostgreSQL already running."
  "$PG_BIN/pg_isready" -h localhost -p 5432
  exit 0
fi

"$PG_BIN/pg_ctl" -D "$PGDATA" -l "$HOME/pgsql.log" -o "-p 5432" start
sleep 2
"$PG_BIN/pg_isready" -h localhost -p 5432
echo "PostgreSQL ready on localhost:5432 (user: postgres, db: exampns_api)"
