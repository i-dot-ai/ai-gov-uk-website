const YAML = require("yaml");
const fs = require("fs");
const path = require("path");

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached Knowledge Hub use cases");
    return cache;
  }

  let useCases = [];
  
  const useCasesDir = path.join(__dirname, "../content/use-case-files");
  const files = fs.readdirSync(useCasesDir).filter(file => file.endsWith('.yaml'));
  
  for (const file of files) {
    const filePath = path.join(useCasesDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const entryData = YAML.parse(fileContent);
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