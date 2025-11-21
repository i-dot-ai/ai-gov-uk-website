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
    .replaceAll('<h4', '<h4 class="govuk-body-s govuk-!-font-weight-bold"')
    .replaceAll('<h5', '<h5 class="govuk-body-s govuk-!-font-weight-bold"')
    .replaceAll('<h6', '<h6 class="govuk-body-s govuk-!-font-weight-bold"')
    .replaceAll('<ul>', '<ul class="govuk-list govuk-list--bullet govuk-list--spaced">')
    .replaceAll('</ul>', '</ul>')
    .replaceAll('<ol>', '<ol class="govuk-list govuk-list--number govuk-list--spaced">')
    .replaceAll('<table>', '<table class="govuk-table">')
    .replaceAll('<thead>', '<thead class="govuk-table__head">')
    .replaceAll('<tbody>', '<tbody class="govuk-table__body">')
    .replaceAll('<tr>', '<tr class="govuk-table__row">')
    .replaceAll('<th>', '<th scope="col" class="govuk-table__header">')
    .replaceAll('<td>', '<td class="govuk-table__cell">')
    .replaceAll('<blockquote>', '<blockquote class="govuk-inset-text">');
};

if (typeof(module) !== 'undefined') {
  module.exports = addGovukClasses;
}
