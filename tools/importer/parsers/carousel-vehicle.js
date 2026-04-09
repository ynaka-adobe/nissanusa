/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-vehicle. Base: carousel.
 * Source: https://www.nissanusa.com/
 * Selectors from captured DOM: .c_431-slide-container, .c_431-1
 */
export default function parse(element, { document }) {
  // Each slide in the vehicle carousel: image | heading + price + links
  const slides = Array.from(element.querySelectorAll('.c_431-1, [class*="c_431-slide"]'));

  const cells = [];
  slides.forEach((slide) => {
    const image = slide.querySelector('.c_431-1-picture img, .c_431-1-image img, img');
    const heading = slide.querySelector('h2, h3, .c_431-1-strapline, .usg-heading-2');
    const price = slide.querySelector('.c_431-1-price, p[class*="price"]');
    const ctaLinks = Array.from(slide.querySelectorAll('a.usg-btn, a.js-cta, .c_431-1-cta a'));

    const imageCell = image ? [image] : [document.createTextNode('')];

    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (price) contentCell.push(price);
    ctaLinks.forEach((a) => contentCell.push(a));

    if (contentCell.length > 0 || image) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-vehicle', cells });
  element.replaceWith(block);
}
