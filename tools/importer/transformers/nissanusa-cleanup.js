/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Nissan USA cleanup.
 * Selectors from captured DOM of https://www.nissanusa.com/
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove modals, tooltips, personalization containers (can interfere with block parsing)
    WebImporter.DOMUtils.remove(element, [
      '.authorableModal',
      '.c_346_modal-overlay',
      '.c_346_modal',
      '.personalizationContainer',
      '.actionPanel',
    ]);

    // Fix overflow issues that may hide content
    const overflowEls = element.querySelectorAll('[style*="overflow: hidden"]');
    overflowEls.forEach((el) => { el.style.overflow = 'visible'; });
  }

  if (hookName === H.after) {
    // Remove non-authorable content: header, footer, nav, breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'nav[aria-label="breadcrumb"]',
      'nav',
      '.experienceFragment',
      '.experiencefragment',
      'iframe',
      'link',
      'noscript',
    ]);

    // Clean tracking attributes
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('data-adobe-target-id');
      el.removeAttribute('data-page-animation');
      el.removeAttribute('data-lightboxes-wording');
      el.removeAttribute('data-analytics');
    });

    // Remove empty divs that are just structural wrappers
    element.querySelectorAll('.endtag').forEach((el) => el.remove());
  }
}
