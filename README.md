# AI.gov.uk site

This is our repository for our [public website](https://ai.gov.uk/). The intent of this site is to give us a public space for showcasing our work, news about the team, upcoming jobs and interesting commercial partnerships.

> Please note that this is a continuous work-in-progress and we will continue to improve the website.

## Getting Started

To get started with the site, use the below commands to build and run the site. This assumes that you already have `node` installed.

To deploy the site, only the `_site` folder is needed.

1. `npm install`
2. `npx @11ty/eleventy --serve`
3. Or to build css and run the app locally use `npm run dev`
4. You can also use `npm run build` to build the `_site` folder

## Cached stylesheets and JavaScript

To prevent browser caching issues (which can otherwise occur even after invalidating the cache), the Eleventy build renames CSS and JS files that change regularly. Additional files can be added to this within `.eleventy.js`.

## Tests

To run the tests, use the below commands from the root of this project.

1. `cd tests`
2. `npx playwright test`

When building new pages, please add to `tests/accessibility.spec.ts`.
