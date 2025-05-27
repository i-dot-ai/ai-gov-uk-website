/*
    This exists because we don't want to create pages for all projects (i.e. the earlier ones that have been created manually)
    This is also a good place to add the preview page
*/

const getProjects = require("./projects.js");

let cache;

module.exports = async () => {

    if (cache) {
        console.log("Using cached projects (new)");
        return cache;
    }

    let allProjects = await getProjects();

    allProjects.push({
        title: "Preview",
        synopsisHeader: ["Summary to go here"],
        components: [
            {
                type: "video",
                source: "",
                audioDescription: ""
            },
        ]
    });

    const filteredProjects = allProjects.filter((project) => {
        return !project.url;
    });

    cache = filteredProjects;
    return filteredProjects;

}