const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

module.exports = async () => {

  let useCases = [];
    
  const useCasesData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/use_cases`
  );

  for (const entry of useCasesData.map((entry) => entry.url)) {
    const entryRawData = await getData(entry);
    const entryContent = Buffer.from(entryRawData.content, "base64").toString("utf8");
    const entryData = matter(entryContent).data;
    useCases.push(entryData);
  }
  
  console.log(useCases);
  return useCases;

};
