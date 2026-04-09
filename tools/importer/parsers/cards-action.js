/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-action. Base: cards.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_063-0, .c_063-0_btn--icon
 */
export default function parse(element, { document }) {
  // Each action button is a card row: icon image | label + link
  const buttons = Array.from(element.querySelectorAll('.c_063-0_btn--icon, a[class*="c_063-0_btn"]'));

  const cells = [];
  buttons.forEach((btn) => {
    const icon = btn.querySelector('img, svg, [class*="icon"]');
    const label = btn.querySelector('span, .c_063-0_btn--icon') || btn;
    const link = btn.closest('a') || btn.querySelector('a');

    const imageCell = icon ? [icon] : [document.createTextNode('')];

    const textCell = [];
    if (label && label.textContent.trim()) {
      const p = document.createElement('p');
      if (link && link.href) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = label.textContent.trim();
        p.appendChild(a);
      } else {
        p.textContent = label.textContent.trim();
      }
      textCell.push(p);
    }

    if (textCell.length > 0) {
      cells.push([imageCell, textCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-action', cells });
  element.replaceWith(block);
}
