/* eslint-disable */
/* global WebImporter */
/**
 * Parser for advanced-tabs. Base: tabs.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_431-nav-container, .c_431-categories
 */
export default function parse(element, { document }) {
  // Extract tab labels from category buttons
  const tabButtons = Array.from(element.querySelectorAll('.c_431-category-title, .c_431-nav button, button[class*="category"]'));

  const cells = [];
  tabButtons.forEach((btn) => {
    const label = btn.textContent.trim();
    if (!label) return;

    // Tab label in first cell, content placeholder in second
    const labelCell = document.createElement('p');
    labelCell.textContent = label;

    const contentCell = document.createElement('p');
    contentCell.textContent = label;

    cells.push([[labelCell], [contentCell]]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'advanced-tabs', cells });
  element.replaceWith(block);
}
