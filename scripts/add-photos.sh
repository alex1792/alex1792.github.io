#!/usr/bin/env bash
# Resize original photos into web-sized WebP files for the gallery.
#
# Usage: scripts/add-photos.sh <trip-id> <photo.jpg> [photo.jpg ...]
#
# For each photo, writes to assets/gallery/<trip-id>/:
#   <name>-thumb.webp  (1600 px on the longest edge, used in the grid)
#   <name>-full.webp   (2400 px on the longest edge, used in the lightbox)
# and prints a snippet to paste into js/gallery-data.js.
#
# Requires cwebp (brew install webp). Originals are never modified; keep them
# outside the repo or in _originals/ (git-ignored).

set -euo pipefail

THUMB_SIZE=1600
FULL_SIZE=2400
QUALITY=80

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <trip-id> <photo.jpg> [photo.jpg ...]" >&2
  exit 1
fi

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install it with: brew install webp" >&2
  exit 1
fi

trip="$1"
shift
out_dir="$(cd "$(dirname "$0")/.." && pwd)/assets/gallery/$trip"
mkdir -p "$out_dir"

# Prints the cwebp -resize arguments that fit the longest edge to $2 px,
# without upscaling.
resize_args() {
  local w="$1" h="$2" size="$3"
  if [ "$w" -ge "$h" ]; then
    [ "$w" -gt "$size" ] && echo "$size 0" || echo "0 0"
  else
    [ "$h" -gt "$size" ] && echo "0 $size" || echo "0 0"
  fi
}

for src in "$@"; do
  name="$(basename "${src%.*}")"
  w="$(sips -g pixelWidth "$src" | awk '/pixelWidth/ {print $2}')"
  h="$(sips -g pixelHeight "$src" | awk '/pixelHeight/ {print $2}')"

  cwebp -quiet -q "$QUALITY" -metadata none \
    -resize $(resize_args "$w" "$h" "$THUMB_SIZE") \
    "$src" -o "$out_dir/$name-thumb.webp"
  cwebp -quiet -q "$QUALITY" -metadata none \
    -resize $(resize_args "$w" "$h" "$FULL_SIZE") \
    "$src" -o "$out_dir/$name-full.webp"

  [ "$h" -gt "$w" ] && shape="tall" || shape="wide"
  echo "      { file: \"$name\", shape: \"$shape\", title: \"\", alt: \"\" },"
done

echo "Wrote $# photo(s) to ${out_dir#"$PWD"/}" >&2
du -sh "$out_dir" >&2
