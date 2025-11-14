const getData = require("./_shared.js").getData;
const yaml = require("yaml");

const pageNameToDataNameMap = {
  'plan-and-run-an-ai-project-a': 'guidance_dev_plan_run_v_a.yaml',
  'plan-and-run-an-ai-project-b': 'guidance_dev_plan_run_v_b.yaml',
  'using-ai-assistants-a': 'guidance_dev_v_a.yaml',
  'using-ai-assistants-b': 'guidance_dev_v_b.yaml',
  'principles': 'principles.yaml',
  'procurement': 'procurement.yaml',
  'legal': 'legal.yaml',
  'ethics': 'ethics.yaml',
  'ethics-building-ai': 'ethics_building_ai.yaml',
  'understanding-ai': 'understanding_ai.yaml',
  'building-ai-solutions': 'building_ai_solutions.yaml',
  'security': 'security.yaml',
  'governance': 'governance.yaml',
  'measure-impact': 'measure_impact.yaml',
}

const pageNameToTitleMap = {
  'plan-and-run-an-ai-project-a': 'Plan and run an AI project (A)',
  'plan-and-run-an-ai-project-b': 'Plan and run an AI project (B)',
  'using-ai-assistants-a': 'Using AI Assistants (A)',
  'using-ai-assistants-b': 'Using AI Assistants (B)',
  'principles': 'The 10 AI Principles',
  'procurement': 'Buy an AI solution',
  'legal': 'Legal',
  'ethics': 'Using AI ethically and responsibly',
  'ethics-building-ai': 'Building with AI ethically and sustainably',
  'understanding-ai': 'Understanding AI',
  'building-ai-solutions': 'Building AI Solutions',
  'security': 'Security',
  'governance': 'Governance',
  'measure-impact': 'How to measure impact of an AI project',
}

const draftPageNames = [
  'legal',
  'understanding-ai',
  'building-ai-solutions',
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
