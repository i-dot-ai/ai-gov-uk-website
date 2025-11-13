const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached Knowledge Hub prompts");
    return cache;
  }

  let prompts = [];
    
  const promptData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/prompts`
  );

  for (const entry of promptData.map((entry) => entry.url)) {
    const entryRawData = await getData(entry);
    const entryContent = Buffer.from(entryRawData.content, "base64").toString("utf8");
    const entryData = matter(entryContent).data;
    
    if (entryData.hideFromLiveSite === true) {
      continue;
    }
    
    prompts.push(entryData);
  }

  prompts.forEach((prompt) => {
    prompt.tags = prompt.tags?.split(', ') || [];
    // Allow for content such as <feature/function>
    prompt.prompt = prompt.prompt.replaceAll('<', '&lt;');
  });

  cache = prompts;
  return prompts;

};
