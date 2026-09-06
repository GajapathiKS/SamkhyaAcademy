#!/bin/sh
set -eu
STAMP=$(date +%Y%m%d-%H%M%S)
mkdir -p ./backups
# Run from repository root on the Lightsail host.
docker compose -f docker-compose.production.yml exec -T postgres \
  pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" -Fc > "./backups/samkhyaacademy-$STAMP.dump"
find ./backups -type f -name '*.dump' -mtime +7 -delete
printf 'Backup written: backups/samkhyaacademy-%s.dump\n' "$STAMP"
