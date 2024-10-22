require('dotenv').config();
const fs = require('fs');
const path = require('path');
const contentful = require('contentful');
const axios = require('axios');
const matter = require('gray-matter');
const getData = require("./_shared.js").getData;

const USE_PREVIEW = false;
const CMS_REPO = "i-dot-ai/ai-gov-uk-cms-content";

let contentfulOptions = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: USE_PREVIEW ? process.env.PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
};
if (USE_PREVIEW) {
    contentfulOptions.host = 'preview.contentful.com';
}
const client = contentful.createClient(contentfulOptions);


/**
 * Fetches an image from the repo and copies to the public/img folder
 * @param {string} fileName
 */
async function downloadImage(fileName) {
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


    // Get new authors
    const newAuthors = await getData(`https://api.github.com/repos/${CMS_REPO}/contents/content/authors`);
    let allAuthors = [];
    for (const author of newAuthors.map(item => item.url)) {
        const authorRawData = await getData(author);
        const authorContent = Buffer.from(authorRawData.content, "base64").toString("utf8");
        const authorData = matter(authorContent).data;
        const picture = authorData.picture.replace("/images/uploads/", "");
        await downloadImage(picture);
        allAuthors.push({
            name: authorData.name,
            jobTitle: authorData.jobTitle,
            picture: {
                fields: {
                    file: {
                        url: `/img/from-cms/${picture}`
                    }
                }
            }
        });
    }


    // Get new blogs
    const newBlogs = await getData(`https://api.github.com/repos/${CMS_REPO}/contents/content/blogs`);
    for (const blog of newBlogs.map(item => item.url)) {
        const blogRawData = await getData(blog);
        const blogContent = Buffer.from(blogRawData.content, "base64").toString("utf8");
        const blogData = matter(blogContent).data;

        // TO DO: This only works with uploaded images, not "Insert from URL" images
        const image = blogData.leadImage.replace("/images/uploads/", "");
        await downloadImage(image);

        // get all images within the content
        for (let component of blogData.components) {
            if (component.type === "bodyText") {
                const imagePaths = component.content.match(/\/images\/uploads\/[a-z0-9\.]*/g);
                if (imagePaths) {
                    for (const imagePath of imagePaths) {
                        await downloadImage(imagePath.replace("/images/uploads/", ""));
                    }
                }
                component.content = component.content.replace(/images\/uploads/g, "img");
            }
        }

        blogs.push({
            title: blogData.title,
            summaryShort: blogData.summaryHubPage,
            summaryLong: blogData.summaryBlogPage,
            authors: (() => {
                let blogAuthors = blogData.authors.map((author) => {
                    return author.author;
                });
                let foundAuthors = [];
                allAuthors.forEach((author) => {
                    if (blogAuthors.includes(author.name)) {
                        foundAuthors.push(author);
                    }
                });
                return foundAuthors;
            })(),
            date: blogData.date,
            coverImage: {
                title: blogData.leadImageCaption,
                description: blogData.leadImageAlt,
                file: {
                    url: `/img/from-cms/${image}`
                }
            },
            components: blogData.components,
            source: "DecapCMS"
        });
    }


    // Add preview blog (for CMS)
    blogs.push({
        title: "Preview",
        summaryLong: "[Optional summary goes here]",
        authors: [{
            name: "[Author goes here]",
            jobTitle: "Job title and image (not available in preview)",
            picture: {
                fields: {
                    file: {
                        url: "https://t4.ftcdn.net/jpg/00/93/85/69/360_F_93856984_YszdhleLIiJzQG9L9pSGDCIvNu5GEWCc.jpg"
                    }
                }
            }
        }],
        date: new Date().toDateString(),
        coverImage: blogs[0].coverImage,
        components: [
            {
                type: "video"
            }
        ],
        source: "DecapCMS"
    });


    // sort by date (latest first)
    blogs.sort((a, b) => {
        return a.date < b.date ? 1 : -1;
    });
    return blogs;

};
