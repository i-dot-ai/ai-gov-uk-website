/*
    This exists because we don't want to create pages for all projects (i.e. the earlier ones that have been created manually)
    This is also a good place to add the preview page
*/

const getProjects = require("./projects.js");

module.exports = async () => {
    let allProjects = await getProjects();

    allProjects.push({
        title: "Preview",
        synopsisHeader: ["Summary to go here"],
        components: [
            {
                type: "doubleColumn",
                order: "Text (left) - Image (right)",
                content: "[Content to go here]",
                image: ""
            },
            {
                type: "doubleColumn",
                order: "Image (left) - Text (right)",
                content: "[Content to go here]",
                image: ""
            },
            {
                type: "video",
                source: "",
                audioDescription: ""
            },
        ]
    });

    return allProjects.filter((project) => {
        return !project.url;
    });
}