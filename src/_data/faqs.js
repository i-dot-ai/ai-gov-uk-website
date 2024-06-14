require('dotenv').config();
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
  
module.exports = () => {

    return client.getEntries({
        content_type: 'faQs'
    }).then((response) => {

        let faqs = response.items.map((role) => {
            return role.fields;
        });

        faqs.sort((a, b) => {
            return a.order - b.order;
        });

        return faqs;

    }).catch((err) => {
        console.error(err);
    });

};
  