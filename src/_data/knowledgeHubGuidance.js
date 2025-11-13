const getData = require("./_shared.js").getData;
const yaml = require("yaml");

const pageNameToDataNameMap = {
  'guidance': 'guidance.yaml',
  'plan-and-run-an-ai-project-a': 'guidance_dev_plan_run_v_a.yaml',
  'plan-and-run-an-ai-project-b': 'guidance_dev_plan_run_v_b.yaml',
  'using-ai-assistants-a': 'guidance_dev_v_a.yaml',
  'using-ai-assistants-b': 'guidance_dev_v_b.yaml',
  'playbook': 'playbook.yaml',
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


const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

const cache = {};

module.exports = async () => {
  
  if (Object.keys(cache).length > 0) {
    console.log('Using cached Knowledge Hub Guidance content');
    return cache;
  }

  for (const [pageName, dataName] of Object.entries(pageNameToDataNameMap)) {
    const guidanceData = await getData(
      `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/${dataName}`
    );
    const yamlData = Buffer.from(guidanceData.content, "base64").toString("utf8");
    const content = yaml.parse(yamlData).content;
    cache[pageName] = content;
  }

  return cache;

};
