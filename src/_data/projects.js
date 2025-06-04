const matter = require("gray-matter");
const getData = require("./_shared.js").getData;

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

// Return static projects if using test credentials
if (process.env.CONTENTFUL_ACCESS_TOKEN === 'test') {
  module.exports = async () => [];
  return;
}

let cache;

module.exports = async () => {

  if (cache) {
    console.log("Using cached projects");
    return cache;
  }

  let projects = [
    {
      title: "rAPId",
      url: "/projects/rapid",
      type: "Other",
      img: "/img/rapid2.webp",
      synopsis: "A secure, interoperable API for data storage and sharing",
    },
    {
      title: "i.AI and NHS England Collaboration Charter",
      url: "/projects/nhs-collaboration",
      type: "Other",
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

    const picture = projectData.leadImage;
    projectData.img = picture.replace("/images/uploads/", "https://i-dot-ai-cms.netlify.app/assets/");

    // Just to map to existing data structure, but this can be updated at the HTML level in future
    projectData.synopsis = projectData.summaryHubPage;
    projectData.synopsisHeader = projectData.summaryProjectPage;

    // get all images within the content
    for (let component of projectData.components || []) {
      if (component.type === "bodyText") {
        const imagePaths = component.content.match(
          /\/images\/uploads\/[a-z0-9\.]*/g
        );
      }
    }

    projects.push(projectData);
  }

  const sortedProjects = projects.sort((projectA, projectB) => {
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

  cache = sortedProjects;
  return sortedProjects;

};
