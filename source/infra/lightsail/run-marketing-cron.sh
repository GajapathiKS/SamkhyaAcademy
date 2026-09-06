#!/usr/bin/env bash
set -euo pipefail
: "${CRON_SECRET:?CRON_SECRET must be set}"
APP_URL="${APP_URL:-http://127.0.0.1:3000}"
curl -fsS -X POST "$APP_URL/api/internal/communications/run-scheduled" -H "Authorization: Bearer $CRON_SECRET"
