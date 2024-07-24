require('dotenv').config();
const contentful = require('contentful');

const USE_PREVIEW = false;

let contentfulOptions = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: USE_PREVIEW ? process.env.PREVIEW_ACCESS_TOKEN : process.env.CONTENTFUL_ACCESS_TOKEN
};
if (USE_PREVIEW) {
    contentfulOptions.host = 'preview.contentful.com';
}
const client = contentful.createClient(contentfulOptions);
  
module.exports = () => {

    return client.getEntries({
        content_type: 'blog'
    }).then((response) => {

        let blogs = response.items.map((blog) => {
            return {
                title: blog.fields.title,
                summaryShort: blog.fields.summary,
                summaryLong: blog.fields.summaryBlogPage,
                author: blog.fields.authorName,
                date: blog.fields.date,
                coverImage: blog.fields.coverImage?.fields,
                content: blog.fields.content,
                contentPart2: blog.fields.contentPart2
            };
        });

        // sort by date (latest first)
        blogs.sort((a, b) => {
            return a.date < b.date ? 1 : -1;
        });

        return blogs;

    }).catch((err) => {
        console.error(err);
    });

};
