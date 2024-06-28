require('dotenv').config();
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
  
module.exports = () => {

    return client.getEntries({
        content_type: 'blog'
    }).then((response) => {

        let blogs = response.items.map((blog) => {
            return {
                title: blog.fields.title,
                summary: blog.fields.summary,
                author: blog.fields.authorName,
                date: blog.fields.date,
                coverImage: blog.fields.coverImage.fields,
                content: blog.fields.content
            };
        });

        // sort by date (latest first)
        blogs.sort((a, b) => {
            return a.date < b.date ? -1 : 1;
        });

        return blogs;

    }).catch((err) => {
        console.error(err);
    });

};
