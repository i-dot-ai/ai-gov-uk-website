require("dotenv").config();
const axios = require("axios");
const fs = require('fs');
const path = require('path');

const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";


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


/**
 * Fetches an image from the repo and copies to the public/img folder
 * @param {string} fileName
 */
module.exports.downloadImage = async (fileName) => {
    const localFilePath = path.resolve(__dirname, `../../public/img/from-cms/${fileName}`);
    if (fs.existsSync(localFilePath)) {
        return;
    }

    try {
        const writer = fs.createWriteStream(localFilePath);
        const response = await axios({
            url: `https://raw.githubusercontent.com/${CMS_REPO}/main/static/images/uploads/${fileName}`,
            method: "GET", 
            responseType: "stream",
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            }
        });
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error(`Error downloading image: ${fileName}`, error.message);
    }
};