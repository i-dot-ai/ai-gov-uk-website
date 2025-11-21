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
    const categoryA = (a.category || "").toLowerCase();
    const categoryB = (b.category || "").toLowerCase();

    // First, sort by category
    if (categoryA !== categoryB) {
      if (!categoryA) {
        return 1;
      }
      if (!categoryB) {
        return -1;
      }
      return categoryA.localeCompare(categoryB);
    }

    // Within the same category, general subcategories come first
    const subcategoryA = (a.subcategory || "");
    const subcategoryB = (b.subcategory || "");
    
    if (subcategoryA.includes('General') && !subcategoryB.includes('General')) {
      return -1;
    }
    if (!subcategoryA.includes('General') && subcategoryB.includes('General')) {
      return 1;
    }

    // If both have subcategories, sort by subcategory
    if (subcategoryA && subcategoryB && subcategoryA !== subcategoryB) {
      return subcategoryA.localeCompare(subcategoryB);
    }

    // Within the same category and subcategory (or both without subcategory), sort by draft status
    if (a.draft && !b.draft) {
      return 1;
    } else if (b.draft && !a.draft) {
      return -1;
    }

    // Then by date
    const dateA = a.updated || a.created || 0;
    const dateB = b.updated || b.created || 0;

    if (dateA !== dateB) {
      return dateB - dateA;
    }

    // Finally by title
    return (a.title || "").localeCompare(b.title || "");
  });

  cache = sortedUseCases;
  return sortedUseCases;
};
