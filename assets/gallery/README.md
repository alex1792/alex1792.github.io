# Gallery photos

Each trip has its own folder here, named after its `id` in
`js/gallery-data.js`. Every photo has two web-sized copies:

- `<name>-thumb.webp`: 1600 px on the longest edge, shown in the grid
- `<name>-full.webp`: 2400 px on the longest edge, shown in the lightbox

Never commit camera originals. Keep them outside the repo, or in `_originals/`
at the repo root (git-ignored).

## Adding a trip

1. Pick your highlights (aim for 4–6 per trip).
2. Generate the web copies (needs `brew install webp` once):

   ```sh
   scripts/add-photos.sh yosemite-2027 ~/Pictures/yosemite/*.jpg
   ```

3. Add a trip block to `js/gallery-data.js`, paste the photo lines the script
   prints, and fill in each `title` and `alt`.
