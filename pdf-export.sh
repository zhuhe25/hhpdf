#!/bin/bash
# Wrapper script to set custom Chromium library path and run pdf-export
# Usage: CHROME_LIB_PATH=/path/to/libs ./pdf-export.sh <url> [options]

SCRIPT_DIR="$(cd "$(dirname "$(readlink -f "$0" 2>/dev/null || echo "$0")")" && pwd)"

if [ -n "$CHROME_LIB_PATH" ]; then
  export CHROME_LIB_PATH
fi

exec node "$SCRIPT_DIR/index.js" "$@"
