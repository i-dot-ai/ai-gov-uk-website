const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

// Return static projects if using test credentials
if (process.env.CONTENTFUL_ACCESS_TOKEN === 'test') {
  module.exports = async () => [];
  return;
}

module.exports = async () => {
  let projects = [
    {
      title: "Consult",
      phase: "Alpha",
      url: "/projects/consult",
      img: "/img/consultation4.png",
      synopsis:
        "An AI-powered tool to automate the processing of public consultations",
    },
    {
      title: "Redbox",
      phase: "Beta",
      url: "/projects/redbox",
      img: "/img/redbox4.png",
      synopsis:
        "Redbox is a service that harnesses AI to help you summarise, and ask questions of, documents up to OFFICIAL-SENSITIVE",
    },
    {
      title: "Caddy",
      phase: "Scaling",
      url: "/projects/caddy",
      img: "/img/caddy1.png",
      synopsis:
        "Our AI powered copilot for customer service agents across government and beyond",
    },
    {
      title: "rAPId",
      url: "/projects/rapid",
      img: "/img/rapid2.webp",
      synopsis: "An end-to-end solution to sharing data across government",
    },
    {
      title: "i.AI and NHS England Collaboration Charter",
      url: "/projects/nhs-collaboration",
      img: "/img/nhs2.png",
      synopsis:
        "i.AI and NHS England sign Collaboration Charter to support the use of AI in the NHS",
    },
  ];

  const newProjects = await getData(
    `https://api.github.com/repos/${CMS_REPO}/contents/content/projects`
  );
  for (const project of newProjects.map((item) => item.url)) {
    const projectRawData = await getData(project);
    const projectContent = Buffer.from(
      projectRawData.content,
      "base64"
    ).toString("utf8");
    const projectData = matter(projectContent).data;

    const picture = projectData.leadImage; //.replace("/images/uploads/", "");

    // get all images within the content
    for (let component of projectData.components || []) {
      if (component.type === "bodyText") {
        const imagePaths = component.content.match(
          /\/images\/uploads\/[a-z0-9\.]*/g
        );
      }
    }

    projects.push({
      title: projectData.title,
      phase: projectData.phase,
      img: picture.replace("/images/uploads/", "https://i-dot-ai-cms.netlify.app/assets/"),
      synopsis: projectData.summaryHubPage,
      synopsisHeader: projectData.summaryProjectPage,
      components: projectData.components,
    });
  }

  return projects.sort((projectA, projectB) => {
    const phaseMap = [
      "N/A",
      "Paused",
      "Scoping",
      "Incubation",
      "Alpha",
      "Beta",
      "Scaling",
    ];
    return (
      phaseMap.indexOf(projectB.phase || "N/A") -
      phaseMap.indexOf(projectA.phase || "N/A")
    );
  });
};
