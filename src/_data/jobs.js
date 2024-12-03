require('dotenv').config();
const contentful = require('contentful');

// Return empty jobs array if using test credentials
if (process.env.CONTENTFUL_ACCESS_TOKEN === 'test') {
    module.exports = () => Promise.resolve([]);
    return;
}

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
  
module.exports = () => {
    return client.getEntries({
        content_type: 'jobs'
    }).then((response) => {
        let jobs = response.items.map((role) => {
            return role.fields;
        });

        // sort by title
        jobs.sort((a, b) => {
            return a.title < b.title ? -1 : 1;
        });

        return jobs;
    }).catch((err) => {
        console.error(err);
        return [];
    });
};
