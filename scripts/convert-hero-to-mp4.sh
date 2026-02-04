#!/usr/bin/env sh
# Converts public/videos/hero.MOV to public/videos/hero.mp4 for Chrome/Edge/Firefox.
# Safari can use either; Chrome does not support .MOV in HTML5 video.
# Requires: ffmpeg (install via brew install ffmpeg or https://ffmpeg.org)

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
SRC="$PROJECT_ROOT/public/videos/hero.MOV"
OUT="$PROJECT_ROOT/public/videos/hero.mp4"

if [ ! -f "$SRC" ]; then
  echo "Source not found: $SRC"
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required. Install with: brew install ffmpeg"
  exit 1
fi

echo "Converting hero.MOV to hero.mp4 (H.264, faststart)..."
ffmpeg -i "$SRC" -c:v libx264 -movflags +faststart -an -y "$OUT"
echo "Done: $OUT"
