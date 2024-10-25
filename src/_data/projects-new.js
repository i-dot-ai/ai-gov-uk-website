const getProjects = require("./projects.js");

module.exports = async () => {
    const allProjects = await getProjects();
    return allProjects.filter((project) => {
        return !project.url;
    });
}