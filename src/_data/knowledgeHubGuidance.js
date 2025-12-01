const getData = require("./_shared.js").getData;
const yaml = require("yaml");

const pageNameToDataNameMap = {
  'how-to-use-ai-at-work': 'guidance_dev_v_b.yaml',
  'principles': 'principles.yaml',
  'procurement': 'procurement.yaml',
  'legal': 'legal.yaml',
  'ethics': 'ethics.yaml',
  'ethics-building-ai': 'ethics_building_ai.yaml',
  'understanding-ai': 'understanding_ai.yaml',
  'security': 'security.yaml',
  'governance': 'governance.yaml',
  'measure-impact': 'measure_impact.yaml',
  'experiment-with-prompts': 'experiment_with_prompts.yaml',
}

const pageNameToTitleMap = {
  'how-to-use-ai-at-work': 'How to use AI at work (draft)',
  'principles': 'The 10 AI Principles',
  'procurement': 'Procure AI (draft)',
  'legal': 'Legal',
  'ethics': 'Using AI ethically and responsibly (draft)',
  'ethics-building-ai': 'Build AI sustainably (draft)',
  'understanding-ai': 'Understanding AI',
  'security': 'Security',
  'governance': 'Governance',
  'measure-impact': 'How to measure impact of an AI project (draft)',
  'experiment-with-prompts': 'Experiment with prompts (draft)',
}

const draftPageNames = [
  'legal',
  'understanding-ai',
  'security',
  'governance',
]




const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

module.exports = async () => {
  
  if (cache) {
    console.log('Using cached Knowledge Hub Guidance content');
    return cache;
  }

  let guidance = [];

  for (const [pageName, dataName] of Object.entries(pageNameToDataNameMap)) {
    const guidanceData = await getData(
      `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/${dataName}`
    );
    const yamlData = Buffer.from(guidanceData.content, "base64").toString("utf8");
    const content = yaml.parse(yamlData).content;

    const guidancePage = {};
    guidancePage.content = content;
    guidancePage.title = pageNameToTitleMap[pageName];
    guidancePage.slug = pageName;
    guidancePage.isDraftVersion = draftPageNames.includes(pageName);
    guidance.push(guidancePage);
  }

  cache = guidance;
  return guidance;

};
