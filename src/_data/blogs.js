require('dotenv').config();
const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
const axios = require('axios');
const matter = require('gray-matter');

const USE_PREVIEW = false;
const CMS_REPO = "/KevinEtchells/Test-DecapCMS";

let contentfulOptions = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: USE_PREVIEW ? process.env.PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
};
if (USE_PREVIEW) {
    contentfulOptions.host = 'preview.contentful.com';
}
const client = contentful.createClient(contentfulOptions);


/**
 * Gets file data from Github
 * @param {string} url 
 * @returns {object}
 */
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
        return [];
    }
}


/**
 * Fetches an image from the repo and copies to the public/img folder
 * @param {string} fileName
 */
async function downloadImage(fileName) {
    
    const localFilePath = path.resolve(__dirname, `../../public/img/${fileName}`);
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
}


module.exports = async () => {

    let response = await client.getEntries({
        content_type: 'blog'
    });
    let blogs = response.items.map((blog) => {
        return {
            title: blog.fields.title,
            summaryShort: blog.fields.summary,
            summaryLong: blog.fields.summaryBlogPage,
            authors: blog.fields.authors.map((author) => author.fields),
            date: blog.fields.date,
            coverImage: blog.fields.coverImage?.fields,
            content: blog.fields.content,
            contentPart2: blog.fields.contentPart2,
            source: "Contentful"
        };
    });


    // Get new blogs
    const newBlogs = await getData(`https://api.github.com/repos${CMS_REPO}/contents/content/blogs`);
    for (const blog of newBlogs.map(item => item.url)) {
        const blogRawData = await getData(blog);
        const blogContent = Buffer.from(blogRawData.content, "base64").toString("utf8");
        const blogData = matter(blogContent).data;

        const image = blogData.leadImage.replace("/images/uploads/", "");
        await downloadImage(image);

        // get all images within the content
        const imagePaths = blogData.content.match(/\/images\/uploads\/[a-z0-9\.]*/g);
        for (const imagePath of imagePaths) {
            await downloadImage(imagePath.replace("/images/uploads/", ""));
        }
        blogData.content = blogData.content.replace(/images\/uploads/g, "img");

        blogs.push({
            title: blogData.title,
            summaryShort: blogData.summaryHubPage,
            summaryLong: blogData.summaryBlogPage,
            author: {
                name: blogData.author
                // TO DO: need to fetch the author to get the other fields
            },
            date: blogData.date,
            coverImage: {
                file: {
                    // TO DO: add caption and alt-text
                    url: `/img/${image}`
                }
            },
            content: blogData.content,
            source: "DecapCMS"
        });
    }

    // sort by date (latest first)
    blogs.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
    return blogs;

};
