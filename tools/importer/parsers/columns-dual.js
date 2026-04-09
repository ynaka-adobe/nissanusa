/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-dual. Base: columns.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_431--secondary-layout
 */
export default function parse(element, { document }) {
  // Two side-by-side award items, each with image + heading + description + CTA
  const containers = Array.from(element.querySelectorAll('.c_431-1, [class*="c_431-1-content"]'));

  // If we can't find sub-containers, treat left/right halves
  const leftContainer = containers[0] || element.querySelector('.c_431--secondary-layout-right-container');
  const rightContainer = containers[1];

  function extractColumn(container) {
    if (!container) return [document.createTextNode('')];
    const col = [];
    const img = container.querySelector('img');
    const heading = container.querySelector('h2, h3, .usg-heading-3, [class*="heading"]');
    const desc = container.querySelector('p, .usg-body, [class*="description"]');
    const cta = container.querySelector('a.usg-btn, a[class*="btn"], a.js-cta');
    if (img) col.push(img);
    if (heading) col.push(heading);
    if (desc) col.push(desc);
    if (cta) col.push(cta);
    return col.length > 0 ? col : [document.createTextNode('')];
  }

  const cells = [];
  cells.push([extractColumn(leftContainer), extractColumn(rightContainer)]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-dual', cells });
  element.replaceWith(block);
}
