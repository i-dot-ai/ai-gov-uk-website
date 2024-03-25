const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const fs = require('fs');

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


  // *** Rename regularly-changing assets, to prevent browser-cache issues ***
  (() => {
    
    const assets = [
      {directory: "/css", name: "style", extension: "css"}, 
      {directory: "/css", name: "tailwind", extension: "css"}, 
      {directory: "/js", name: "main", extension: "js"}
    ];
    let timestamp = "";
    
    eleventyConfig.on("eleventy.before", async ({ dir, runMode, outputMode }) => {
      
      timestamp = Date.now().toString().substring(2, 10);

      assets.forEach((asset) => {

        // remove any previous versions of these files
        fs.readdir(`./_site${asset.directory}`, (err, files) => {
          files.forEach((file) => {
            if (file.startsWith(`${asset.name}_`)) {
              fs.unlink(`./_site${asset.directory}/${file}`, (err) => {
                if (err) {
                  console.error(`Error deleting file ${file}:`, err);
                }
              });
            }
          });
        });

        // create new versions of these files
        fs.copyFile(`./_site${asset.directory}/${asset.name}.${asset.extension}`, `./_site${asset.directory}/${asset.name}_${timestamp}.${asset.extension}`, (err) => {
          if (err) {
             console.error('Error copying file:', err);
          }
        });

      });

    });
  
    // update each HTML file with new asset paths
    eleventyConfig.addTransform("asset-versions", (content) => {
      assets.forEach((asset) => {
        content = content.replace(`${asset.directory}/${asset.name}`, `${asset.directory}/${asset.name}_${timestamp}`);
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
