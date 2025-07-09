// @ts-check

/**
 * Adds govuk classes to plain HTML, e.g. `<p>` becomes `<p class="govuk-body">`
 * @param {string} htmlString 
 * @returns {string}
 */
const addGovukClasses = (htmlString) => {
  return htmlString
    .replaceAll('<p></p>', '')
    .replaceAll('<p>', '<p class="govuk-body">')
    .replaceAll('<a', '<a class="govuk-link"')
    .replaceAll('<h2', '<h2 class="govuk-heading-m"')
    .replaceAll('<h3', '<h3 class="govuk-heading-s"')
    .replaceAll('<ul>', '<ul class="govuk-list govuk-list--bullet govuk-list--spaced">');
};

if (typeof(module) !== 'undefined') {
  module.exports = addGovukClasses;
}
