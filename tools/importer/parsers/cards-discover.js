/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-discover. Base: cards.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_550, .c_550-item
 */
export default function parse(element, { document }) {
  // Each discover card: image | heading + description + link
  const items = Array.from(element.querySelectorAll('.c_550-item-wrapper, .c_550-item, [class*="c_550-item"]'));

  const cells = [];
  items.forEach((item) => {
    const image = item.querySelector('img');
    const heading = item.querySelector('h2, h3, .c_550-minimized-title, [class*="heading"]');
    const description = item.querySelector('p, .c_550-content-parsys p, [class*="description"]');
    const link = item.querySelector('a.usg-btn, a[class*="btn"], a[class*="cta"]');

    const imageCell = image ? [image] : [document.createTextNode('')];

    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    if (link) contentCell.push(link);

    if (contentCell.length > 0 || image) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-discover', cells });
  element.replaceWith(block);
}
