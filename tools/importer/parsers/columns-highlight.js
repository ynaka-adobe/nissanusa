/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-highlight. Base: columns.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_271, .c_274, .nextGenMedia
 */
export default function parse(element, { document }) {
  // Side-by-side layout: image column | text + heading + CTA column
  const image = element.querySelector('img');
  const heading = element.querySelector('h2, h3, .usg-heading-2, .usg-heading-3, [class*="heading"]');
  const description = element.querySelector('p:not([class*="btn"]), .usg-body, [class*="description"]');
  const ctaLink = element.querySelector('a.usg-btn, a[class*="btn"], a.js-cta');

  const imageCol = image ? [image] : [document.createTextNode('')];

  const textCol = [];
  if (heading) textCol.push(heading);
  if (description) textCol.push(description);
  if (ctaLink) textCol.push(ctaLink);

  const cells = [];
  cells.push([imageCol, textCol]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-highlight', cells });
  element.replaceWith(block);
}
