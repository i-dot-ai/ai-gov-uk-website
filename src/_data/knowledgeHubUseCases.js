const getData = require("./_shared.js").getData;
const YAML = require("yaml");

const USE_CASE_REPO = "i-dot-ai/knowledge-hub";

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached Knowledge Hub use cases");
    return cache;
  }

  let useCases = [];
    
  const useCasesData = await getData(
    `https://api.github.com/repos/${USE_CASE_REPO}/contents/frontend/src/content/use-case-files`
  );

  for (const entry of useCasesData) {
    if (entry.type !== 'file' || (!entry.name.endsWith('.yaml') && !entry.name.endsWith('.yml'))) {
      continue;
    }

    const fileData = await getData(entry.url);
    const entryContent = Buffer.from(fileData.content, "base64").toString("utf8");
    const entryData = YAML.parse(entryContent);
    useCases.push(entryData);
  }

  // format data
  useCases.forEach((useCase) => {
    if (useCase.impact) {
      useCase.impact = useCase.impact.toString().replace(/,/g, " / ");
    }
  });

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
