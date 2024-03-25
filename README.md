# AI.gov.uk core site

## Getting Started

1. `npm install`
2. `npx @11ty/eleventy --serve`
3. Or to build css and run the app locally use `npm run dev`
4. You can also use `npm run build` to build the `_site` folder

## Cached stylesheets and JavaScript

To prevent browser caching issues (which can otherwise occur even after invalidating the S3 cache), the Eleventy build renames CSS and JS files that change regularly. Additional files can be added to this within `.eleventy.js`.

## Tests

1. `cd tests`
2. `npx playwright test`