require("dotenv").config();
const axios = require("axios");

/**
 * Gets file data from Github
 * @param {string} url 
 * @returns {object}
 */
module.exports.getData = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "Authorization": `token ${process.env.CMS_REPO_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            }
        });
        return (response.data);
    } catch (error) {
        console.error(`Error fetching for URL: ${url}`, error.message);
        return [];
    }
};
