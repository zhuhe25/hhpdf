#!/bin/bash
# Wrapper script to set Chromium library path and run pdf-export

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LIB_DIR="/tmp/chrome-libs/extracted/usr/lib/x86_64-linux-gnu:/tmp/chrome-libs/extracted/lib/x86_64-linux-gnu"

export CHROME_LIB_PATH="$LIB_DIR"
exec node "$SCRIPT_DIR/index.js" "$@"
