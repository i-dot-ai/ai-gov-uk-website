const getData = require("./_shared.js").getData;
const yaml = require("yaml");


const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

module.exports = async () => {
    
  const guidanceData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/guidance.yaml`
  );

  const yamlData = Buffer.from(guidanceData.content, "base64").toString("utf8");
  const content = yaml.parse(yamlData).content;
  return content;

};
