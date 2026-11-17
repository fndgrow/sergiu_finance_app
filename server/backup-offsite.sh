#!/usr/bin/env bash
# Casieria EHL — copy the newest PocketBase backup off the server, so a dead disk does not take the books with it.
# PocketBase writes pb_data/backups/@auto_pb_backup_*.zip every night (migration 0002). This script sends the newest one
# to another machine over ssh. Run it from cron on the server, e.g. every night at 04:00:
#   0 4 * * * BACKUP_TARGET=user@backup-host:/backups/casieria /opt/casieria/backup-offsite.sh >> /opt/casieria/backup-offsite.log 2>&1
# BACKUP_TARGET is an scp destination (host:folder). The receiving host needs this server's ssh key in authorized_keys.
set -euo pipefail
DIR="${DIR:-/opt/casieria}"
TARGET="${BACKUP_TARGET:?set BACKUP_TARGET=user@host:/folder}"
KEEP="${KEEP:-30}"
NEWEST="$(ls -1t "$DIR"/pb_data/backups/@auto_pb_backup_*.zip 2>/dev/null | head -1 || true)"
[ -n "$NEWEST" ] || { echo "$(date -Is) no backup zip found in $DIR/pb_data/backups"; exit 1; }
scp -q "$NEWEST" "$TARGET/" && echo "$(date -Is) sent $(basename "$NEWEST") ($(du -h "$NEWEST" | cut -f1)) to $TARGET"
# prune old copies on the receiving side (keeps the newest $KEEP)
HOST="${TARGET%%:*}"; FOLDER="${TARGET#*:}"
ssh "$HOST" "cd '$FOLDER' && ls -1t @auto_pb_backup_*.zip 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -f" || true
