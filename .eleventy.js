const htmlmin = require("html-minifier");
const fs = require("fs").promises;
const _fs = require("fs");
const path = require("path");
const { BLOCKS } = require("@contentful/rich-text-types");
const {
  documentToHtmlString,
  NodeTypes,
} = require("@contentful/rich-text-html-renderer");
const litPlugin = require("@lit-labs/eleventy-plugin-lit");

const showdown = require("showdown");
const mdToHtmlConverter = new showdown.Converter();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "public/": "/"
  });

  eleventyConfig.addPlugin(litPlugin, {
    mode: "worker",
    componentModules: [
      "public/js/lit-components/blog-carousel.mjs",
      "public/js/lit-components/text-image-block.mjs",
      "public/js/lit-components/project-quote.mjs",
      "public/js/lit-components/usecase-filters.mjs",
      "public/js/lit-components/iai-header.mjs"
    ],
  });

  // Remove Shadow DOM from Lit components
  eleventyConfig.on("afterBuild", () => {
    const processHTMLFiles = (dir) => {
      const entries = _fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          processHTMLFiles(fullPath);
        } else if (entry.isFile() && entry.name.endsWith(".html")) {
          const content = _fs.readFileSync(fullPath, "utf8");
          const updatedContent = content
            .replace(/<template shadowroot="open" shadowrootmode="open">/g, "")
            .replace(/<\/template>/g, "");
          _fs.writeFileSync(fullPath, updatedContent, "utf8");
        }
      }
    }
    processHTMLFiles("_site");
  });

  eleventyConfig.addTransform("htmlmin", function (content) {
    if (this.page.outputPath && this.page.outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addFilter("dateFormat", (dateString, type) => {
    if (type === 'int') {
      dateString = parseInt(dateString);
    }
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  });

  eleventyConfig.addFilter("preventOrphans", (text) => {
    const lastSpaceIndex = text.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return text;
    }
    const beforeSpace = text.substring(0, lastSpaceIndex);
    const afterSpace = text.substring(lastSpaceIndex + 1);
    return `${beforeSpace}&nbsp;${afterSpace}`;
  });

  eleventyConfig.addFilter("richTextToHTML", (value) => {
    return documentToHtmlString(value, {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: ({
          data: {
            target: { fields },
          },
        }) => {
          if (fields.file?.url.includes(".mp4")) {
            let html = `
              <video class="iai-promo-video" controls preload="auto" aria-describedby="video-desc">
                <source src="${fields.file.url}" type="video/mp4" />
                Download the <a href="${fields.file.url}">video</a>
              </video>
            `;
            if (fields.description) {
              html += `
                <p class="iai-video__audio-description" id="video-desc">
                  <img src="/icons/audio-description.svg" loading="lazy" alt=""/>
                  <a class="link" href="${fields.description}">Audio described video</a>
                </p>
              `;
            }
            return html;
          } else {
            if (fields.title) {
              return `
                <figure>
                  <img src="${fields.file?.url}" alt="${fields.description}" loading="lazy"/>
                  <figcaption>${fields.title}</figcaption>
                </figure>
              `;
            } else {
              return `
                <img src="${fields.file?.url}" alt="${fields.description}" loading="lazy"/>
              `;
            }
          }
        },
      },
    });
  });

  eleventyConfig.addFilter("UUID", () => {
    return crypto.randomUUID();
  });

  eleventyConfig.addFilter("markdownToHtml", (value, govukStyles) => {
    let html = mdToHtmlConverter.makeHtml(value);

    let images = html.match(/<img\s+src="[^"]*"\s*[^>]*>/g);
    images?.forEach((image) => {
      // show a caption if required
      const caption = (() => {
        let match = image.match(/title="([^"]*)"/);
        if (match) {
          return match[1];
        }
      })();
      if (caption) {
        html = html.replace(
          image,
          `<figure>${image}<figcaption>${caption}</figcaption></figure>`
        );
      }
      // set correct image path
      if (!image.includes('"https:')) {
        // check it's not an external image (careful to allow for links in the caption)
        html = html.replace(
          image,
          image.replace(
            "/images/uploads",
            "https://i-dot-ai-cms.netlify.app/assets"
          )
        );
      }
    });

    if (govukStyles) {
      html = html
        .replace(/<h2/g, '<h2 class="govuk-heading-m"')
        .replace(/<ul>/g, '<ul class="govuk-list govuk-list--bullet govuk-list--spaced">');
    }

    return html;
  });


  /**
   * Creates an array from all <h2>s within html
   */
  eleventyConfig.addFilter("getHeadings", (html) => {
    const regex = /<h2[^>]* id="([^"]*)"[^>]*>(.*?)<\/h2>/g;
    const h2Array = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      h2Array.push({
          id: match[1], // Captured ID from the h2 tag
          content: match[2] // The content captured between <h2> and </h2>
      });
    }
    return h2Array;
  });


  eleventyConfig.addFilter("rssDate", (dateStr) => {
    const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let date = new Date(dateStr);
    return `${DAYS[date.getDay()]}, ${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()} 00:00:00 GMT`;
  });


  // *** Rename regularly-changing assets, to prevent browser-cache issues ***
  (() => {
    const assets = [
      { directory: "/css", name: "style", extension: "css" },
      { directory: "/js", name: "main", extension: "js" },
    ];
    let timestamp = "";

    const waitForFile = async (filePath, interval = 500) => {
      while (true) {
        try {
          await fs.access(filePath);
          console.log(`File ${filePath} exists.`);
          return;
        } catch (err) {
          // File does not exist yet, wait for the next interval
          await new Promise((resolve) => setTimeout(resolve, interval));
        }
      }
    };

    eleventyConfig.on(
      "eleventy.before",
      async ({ dir, runMode, outputMode }) => {
        timestamp = Date.now().toString().substring(2, 10);

        for (let asset of assets) {
          // remove any previous versions of these files
          try {
            let files = await fs.readdir(`./_site${asset.directory}`);
            for (let file of files) {
              //console.log(`Removing file: ${asset.name}`);
              if (file.startsWith(`${asset.name}`)) {
                try {
                  await fs.unlink(`./_site${asset.directory}/${file}`);
                } catch (err) {
                  console.error(`Error deleting file ${file}:`, err);
                }
              }
            }
          } catch (err) {
            console.log("Directory doesn't exist yet");
          }

          // create new versions of these files
          waitForFile(
            `./_site${asset.directory}/${asset.name}.${asset.extension}`
          ).then(async () => {
            //console.log(`Found file ${asset.name}`);
            try {
              await fs.copyFile(
                `./_site${asset.directory}/${asset.name}.${asset.extension}`,
                `./_site${asset.directory}/${asset.name}_${timestamp}.${asset.extension}`
              );
            } catch (err) {
              console.error("Error copying file:", err);
            }
          });
        }
      }
    );

    // update each HTML file with new asset paths
    eleventyConfig.addTransform("asset-versions", (content) => {
      assets.forEach((asset) => {
        content = content.replace(
          `${asset.directory}/${asset.name}`,
          `${asset.directory}/${asset.name}_${timestamp}`
        );
      });
      return content;
    });
  })();

  return {
    pathPrefix: "/",
    templateFormats: ["njk"],
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
