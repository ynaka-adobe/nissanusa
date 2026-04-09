/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-promo. Base: hero.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .pfaMedia, .carousel-pfa_slide_hero, .carousel-pfa_slide_content
 */
export default function parse(element, { document }) {
  // Extract background image from hero slide
  const bgImage = element.querySelector('.carousel-pfa_slide_hero img, .carousel-pfa_slide img, img');

  // Extract text content from content holder
  const contentHolder = element.querySelector('.carousel-pfa_slide_content-holder, .carousel-pfa_slide_content');

  const heading = contentHolder
    ? contentHolder.querySelector('h1, h2, h3, .usg-heading-1, .usg-heading-2')
    : element.querySelector('h1, h2, h3');

  const paragraphs = contentHolder
    ? Array.from(contentHolder.querySelectorAll('p, .usg-body'))
    : Array.from(element.querySelectorAll('p'));

  const ctaLinks = contentHolder
    ? Array.from(contentHolder.querySelectorAll('a.usg-btn, a.js-cta, a[class*="btn"]'))
    : Array.from(element.querySelectorAll('a.usg-btn, a.js-cta'));

  const cells = [];

  // Row 1: Background image (optional per hero spec)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading + text + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  paragraphs.forEach((p) => {
    if (p.textContent.trim()) contentCell.push(p);
  });
  ctaLinks.forEach((a) => contentCell.push(a));

  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
