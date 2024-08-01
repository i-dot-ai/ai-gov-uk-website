const htmlmin = require("html-minifier");
const fs = require("fs").promises;
const { BLOCKS } = require("@contentful/rich-text-types");
const {
  documentToHtmlString,
  NodeTypes,
} = require("@contentful/rich-text-html-renderer");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    "./public/": "/",
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

  eleventyConfig.addFilter("dateFormat", (dateString) => {
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
          if (fields.file.url.includes(".mp4")) {
            return `
              <video class="iai-promo-video" controls preload="auto" aria-describedby="video-desc">
                <source src="${fields.file.url}" type="video/mp4" />
                Download the <a href="${fields.file.url}">video</a>
              </video>
              <div class="sr-only" id="video-desc">${fields.description}</div>
            `;
          } else {
            if (fields.title) {
              return `
                <figure>
                  <img src="${fields.file.url}" alt="${fields.description}" loading="lazy"/>
                  <figcaption>${fields.title}</figcaption>
                </figure>
              `;
            } else {
              return `
                <img src="${fields.file.url}" alt="${fields.description}" loading="lazy"/>
              `;
            }
          }
        }
      },
    });
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
