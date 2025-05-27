/*
require('dotenv').config();
const contentful = require('contentful');

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
});
  
module.exports = () => {

    return client.getEntries({
        content_type: 'roles'
    }).then((response) => {

        let roles = response.items.map((role) => {
            return {
                title: role.fields.title,
                group: role.fields.group.fields.name,
                roleSpec: role.fields.roleResponsibilities ? Object.values(role.fields.roleResponsibilities).map(responsibility => responsibility.fields.text) : [],
                personSpec: Object.values(role.fields.personSpecification).map(specification => specification.fields.text)
            };
        });

        // sort by group, then by title
        roles.sort((a, b) => {
            if (a.group === b.group) {
                return a.title < b.title ? -1 : 1;
            }
            return a.group < b.group ? -1 : 1;
        });

        // split into groups
        const groups = [];
        roles.forEach((role) => {
            if (groups.length && groups[groups.length - 1].group === role.group) {
                groups[groups.length - 1].roles.push(role);
            } else {
                groups.push({
                    group: role.group,
                    roles: [role]
                });
            }
        });

        return groups;

    }).catch((err) => {
        console.error(err);
    });

};
*/