const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached Knowledge Hub capabilities");
    return cache;
  }

  let capabilities = [];
    
  const capabilityData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/capabilities`
  );

  for (const entry of capabilityData.map((entry) => entry.url)) {
    const entryRawData = await getData(entry);
    const entryContent = Buffer.from(entryRawData.content, "base64").toString("utf8");
    const entryData = matter(entryContent).data;
    capabilities.push(entryData);
  }

  cache = capabilities;
  return capabilities;
};
