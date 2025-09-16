// @ ts-check

const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

// Return static projects if using test credentials
if (process.env.CONTENTFUL_ACCESS_TOKEN === 'test') {
  module.exports = async () => [];
  return;
}

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached evaluations");
    return cache;
  }

  let evaluations = [
    { title: "CMS Preview", content: "" }
  ];

  const evaluationsFetch = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/evals`
  );
  for (const evaluation of evaluationsFetch.map((item) => item.url)) {
    const rawData = await getData(evaluation);
    const content = Buffer.from(
      rawData.content,
      "base64"
    ).toString("utf8");
    const evaluationData = matter(content).data;

    // get all images within the content
    for (let component of evaluationData.components || []) {
      if (component.type === "bodyText") {
        const imagePaths = component.content.match(
          /\/images\/uploads\/[a-z0-9\.]*/g
        );
      }
    }

    evaluations.push(evaluationData);
  }

  cache = evaluations;
  return evaluations;

};
