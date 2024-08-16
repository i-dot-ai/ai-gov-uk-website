
require('dotenv').config();
const axios = require('axios');

async function getData(url) {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28",
            }
        });
        return (response.data);
    } catch (error) {
        console.error(`Error fetching for URL: ${url}`, error.message);
    }
}

(async () => {
    const blogs = await getData(`https://api.github.com/repos/KevinEtchells/Test-DecapCMS/contents/content/blogs`);
    blogs.map(item => item.url).forEach(async (blog) => {
        const blogData = await getData(blog);
        const blogContent = Buffer.from(blogData.content, "base64").toString("utf8");
        console.log(blogContent);
    });
})();
