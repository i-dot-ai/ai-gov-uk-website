const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached Knowledge Hub use cases");
    return cache;
  }

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

  // format data
  useCases.forEach((useCase) => {
    if (useCase.impact) {
      useCase.impact = useCase.impact.toString().replace(/,/g, " / ");
    }
  });

  //console.log(useCases);
  const sortedUseCases = useCases.sort((a, b) => {
    if (a.draft && !b.draft) {
      return 1;
    } else if (b.draft && !a.draft) {
      return -1;
    }
    return (b.updated || b.created) - (a.updated || a.created);
  });

  cache = sortedUseCases;
  return sortedUseCases;

};
