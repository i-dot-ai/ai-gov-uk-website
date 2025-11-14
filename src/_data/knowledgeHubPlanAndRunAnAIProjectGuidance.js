const getData = require("./_shared.js").getData;
const yaml = require("yaml");
const showdown = require("showdown");
const addGovukClasses = require("../../public/js/add-govuk-classes.js");

const mdToHtmlConverter = new showdown.Converter();
mdToHtmlConverter.setOption('tables', true);

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let cache;

const extractPhases = (htmlContent) => {
    const regex = /<h2[^>]* id="([^"]*)"[^>]*>(.*?)<\/h2>/g;
    const phases = [''];
    let match;
    
    while ((match = regex.exec(htmlContent)) !== null) {
      const fullText = match[2];
      // Extract text up to ":" if present
      const textUpToColon = fullText.includes(':') 
        ? fullText.substring(0, fullText.indexOf(':'))
        : fullText;
      
      phases.push(textUpToColon.trim());
    }
    
    return phases;
}

const extractContentForPhase = (htmlContent, phase, phases) => {
    const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
    const sections = htmlContent.split(headingRegex);
    
    // If no phase provided, return content before first h2
    if (!phase) {
      return {
        heading: '',
        beforeStageGate: sections[0] || '',
        stageGate: '',
        phase,
        phases,
        includeNextLink: false,
        includePreviousLink: false,
      };
    }

    const includePreviousLink = phases.slice(1).includes(phase);
    const includeNextLink = phases.slice(0, -1).includes(phase);

    
    for (let i = 1; i < sections.length; i += 2) {
      const headingText = sections[i].toLowerCase().replace(/[^a-z0-9]/g, '');
      const phaseNormalised = phase?.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      if (headingText.includes(phaseNormalised)) {
        const content = sections[i + 1] || '';
        
        // Split by stage-gate section
        const stageGateRegex = /<p[^>]*>For your stage-gate review you must have/i;
        const parts = content.split(stageGateRegex);
        
        if (parts.length > 1) {
          return {
            heading: sections[i],
            beforeStageGate: parts[0],
            stageGate: '<p class="govuk-body">For your stage-gate review you must have' + parts[1],
            phase,
            phases,
            includePreviousLink,
            includeNextLink
          };
        }
        
        return {
          heading: sections[i],
          beforeStageGate: content,
          stageGate: '',
          phase,
          phases,
          includePreviousLink,
          includeNextLink
        };
      }
    }
    
    return { heading: '', beforeStageGate: '', stageGate: '', phase, phases, includePreviousLink, includeNextLink };
  };


module.exports = async () => {
  
  if (cache) {
    console.log('Using cached Knowledge Hub Plan and Run an AI Project Guidance content');
    return cache;
  }

  const guidanceData = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/knowledge_hub/guidance_dev_plan_run_v_a.yaml`
  );

  const yamlData = Buffer.from(guidanceData.content, "base64").toString("utf8");
  const content = yaml.parse(yamlData).content;
  const htmlContent = addGovukClasses(mdToHtmlConverter.makeHtml(content));

  const phases = extractPhases(htmlContent);
  const contentForPhases = phases.map(phase => extractContentForPhase(htmlContent, phase, phases.slice(1)));

  cache = contentForPhases;
  return contentForPhases;
};
