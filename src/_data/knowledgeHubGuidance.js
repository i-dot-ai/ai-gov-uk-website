const getData = require("./_shared.js").getData;
const yaml = require("yaml");


const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

module.exports = async () => {
  
  if (cache) {
    console.log('Using cached Knowledge Hub Guidance content');
    return cache;
  }

  const guidanceData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/guidance.yaml`
  );

  const yamlData = Buffer.from(guidanceData.content, "base64").toString("utf8");
  const content = yaml.parse(yamlData).content;
  
  cache = content;
  return content;

};
