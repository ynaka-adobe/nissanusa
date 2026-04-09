var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-promo.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".carousel-pfa_slide_hero img, .carousel-pfa_slide img, img");
    const contentHolder = element.querySelector(".carousel-pfa_slide_content-holder, .carousel-pfa_slide_content");
    const heading = contentHolder ? contentHolder.querySelector("h1, h2, h3, .usg-heading-1, .usg-heading-2") : element.querySelector("h1, h2, h3");
    const paragraphs = contentHolder ? Array.from(contentHolder.querySelectorAll("p, .usg-body")) : Array.from(element.querySelectorAll("p"));
    const ctaLinks = contentHolder ? Array.from(contentHolder.querySelectorAll('a.usg-btn, a.js-cta, a[class*="btn"]')) : Array.from(element.querySelectorAll("a.usg-btn, a.js-cta"));
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    paragraphs.forEach((p) => {
      if (p.textContent.trim()) contentCell.push(p);
    });
    ctaLinks.forEach((a) => contentCell.push(a));
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-action.js
  function parse2(element, { document }) {
    const buttons = Array.from(element.querySelectorAll('.c_063-0_btn--icon, a[class*="c_063-0_btn"]'));
    const cells = [];
    buttons.forEach((btn) => {
      const icon = btn.querySelector('img, svg, [class*="icon"]');
      const label = btn.querySelector("span, .c_063-0_btn--icon") || btn;
      const link = btn.closest("a") || btn.querySelector("a");
      const imageCell = icon ? [icon] : [document.createTextNode("")];
      const textCell = [];
      if (label && label.textContent.trim()) {
        const p = document.createElement("p");
        if (link && link.href) {
          const a = document.createElement("a");
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
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-action", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-vehicle.js
  function parse3(element, { document }) {
    const slides = Array.from(element.querySelectorAll('.c_431-1, [class*="c_431-slide"]'));
    const cells = [];
    slides.forEach((slide) => {
      const image = slide.querySelector(".c_431-1-picture img, .c_431-1-image img, img");
      const heading = slide.querySelector("h2, h3, .c_431-1-strapline, .usg-heading-2");
      const price = slide.querySelector('.c_431-1-price, p[class*="price"]');
      const ctaLinks = Array.from(slide.querySelectorAll("a.usg-btn, a.js-cta, .c_431-1-cta a"));
      const imageCell = image ? [image] : [document.createTextNode("")];
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (price) contentCell.push(price);
      ctaLinks.forEach((a) => contentCell.push(a));
      if (contentCell.length > 0 || image) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-vehicle", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/advanced-tabs.js
  function parse4(element, { document }) {
    const tabButtons = Array.from(element.querySelectorAll('.c_431-category-title, .c_431-nav button, button[class*="category"]'));
    const cells = [];
    tabButtons.forEach((btn) => {
      const label = btn.textContent.trim();
      if (!label) return;
      const labelCell = document.createElement("p");
      labelCell.textContent = label;
      const contentCell = document.createElement("p");
      contentCell.textContent = label;
      cells.push([[labelCell], [contentCell]]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "advanced-tabs", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-discover.js
  function parse5(element, { document }) {
    const items = Array.from(element.querySelectorAll('.c_550-item-wrapper, .c_550-item, [class*="c_550-item"]'));
    const cells = [];
    items.forEach((item) => {
      const image = item.querySelector("img");
      const heading = item.querySelector('h2, h3, .c_550-minimized-title, [class*="heading"]');
      const description = item.querySelector('p, .c_550-content-parsys p, [class*="description"]');
      const link = item.querySelector('a.usg-btn, a[class*="btn"], a[class*="cta"]');
      const imageCell = image ? [image] : [document.createTextNode("")];
      const contentCell = [];
      if (heading) contentCell.push(heading);
      if (description) contentCell.push(description);
      if (link) contentCell.push(link);
      if (contentCell.length > 0 || image) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-discover", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-highlight.js
  function parse6(element, { document }) {
    const image = element.querySelector("img");
    const heading = element.querySelector('h2, h3, .usg-heading-2, .usg-heading-3, [class*="heading"]');
    const description = element.querySelector('p:not([class*="btn"]), .usg-body, [class*="description"]');
    const ctaLink = element.querySelector('a.usg-btn, a[class*="btn"], a.js-cta');
    const imageCol = image ? [image] : [document.createTextNode("")];
    const textCol = [];
    if (heading) textCol.push(heading);
    if (description) textCol.push(description);
    if (ctaLink) textCol.push(ctaLink);
    const cells = [];
    cells.push([imageCol, textCol]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-highlight", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-dual.js
  function parse7(element, { document }) {
    const containers = Array.from(element.querySelectorAll('.c_431-1, [class*="c_431-1-content"]'));
    const leftContainer = containers[0] || element.querySelector(".c_431--secondary-layout-right-container");
    const rightContainer = containers[1];
    function extractColumn(container) {
      if (!container) return [document.createTextNode("")];
      const col = [];
      const img = container.querySelector("img");
      const heading = container.querySelector('h2, h3, .usg-heading-3, [class*="heading"]');
      const desc = container.querySelector('p, .usg-body, [class*="description"]');
      const cta = container.querySelector('a.usg-btn, a[class*="btn"], a.js-cta');
      if (img) col.push(img);
      if (heading) col.push(heading);
      if (desc) col.push(desc);
      if (cta) col.push(cta);
      return col.length > 0 ? col : [document.createTextNode("")];
    }
    const cells = [];
    cells.push([extractColumn(leftContainer), extractColumn(rightContainer)]);
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-dual", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/nissanusa-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        ".authorableModal",
        ".c_346_modal-overlay",
        ".c_346_modal",
        ".personalizationContainer",
        ".actionPanel"
      ]);
      const overflowEls = element.querySelectorAll('[style*="overflow: hidden"]');
      overflowEls.forEach((el) => {
        el.style.overflow = "visible";
      });
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header",
        "footer",
        'nav[aria-label="breadcrumb"]',
        "nav",
        ".experienceFragment",
        ".experiencefragment",
        "iframe",
        "link",
        "noscript"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("data-adobe-target-id");
        el.removeAttribute("data-page-animation");
        el.removeAttribute("data-lightboxes-wording");
        el.removeAttribute("data-analytics");
      });
      element.querySelectorAll(".endtag").forEach((el) => el.remove());
    }
  }

  // tools/importer/transformers/nissanusa-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) return;
      const sections = template.sections;
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-promo": parse,
    "cards-action": parse2,
    "carousel-vehicle": parse3,
    "advanced-tabs": parse4,
    "cards-discover": parse5,
    "columns-highlight": parse6,
    "columns-dual": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Nissan USA homepage with hero, vehicle showcases, promotions, and brand content",
    urls: [
      "https://www.nissanusa.com/"
    ],
    blocks: [
      {
        name: "hero-promo",
        instances: [
          ".pfaMedia .carousel-pfa_slide_hero",
          ".pfaMedia .carousel-pfa_slide_content-holder"
        ]
      },
      {
        name: "cards-action",
        instances: [
          ".c_063-0.next-gen"
        ]
      },
      {
        name: "carousel-vehicle",
        instances: [
          ".vehiclePFA .c_431-slide-container"
        ]
      },
      {
        name: "advanced-tabs",
        instances: [
          ".vehiclePicker .c_431-nav-container",
          ".vehiclePicker .c_431-categories"
        ]
      },
      {
        name: "cards-discover",
        instances: [
          ".horizontalAccordion .c_550"
        ]
      },
      {
        name: "columns-highlight",
        instances: [
          ".c_271.c_271--main-container",
          ".nextGenMedia .c_274"
        ]
      },
      {
        name: "columns-dual",
        instances: [
          ".c_431.c_431--secondary-layout"
        ]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Promotional Banner",
        selector: ".pfaMedia.section",
        style: null,
        blocks: ["hero-promo", "cards-action"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Vehicle Showcase",
        selector: ".vehiclePFA",
        style: null,
        blocks: ["carousel-vehicle", "advanced-tabs"],
        defaultContent: [".onitOffers .c_258"]
      },
      {
        id: "section-3",
        name: "Fastest Growing Brand",
        selector: ".c_271.c_271--main-container.c_271--center",
        style: null,
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Pathfinder Campaign",
        selector: ".nextGenMedia.section",
        style: "dark",
        blocks: ["columns-highlight"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Discover Grid",
        selector: ".horizontalAccordion.section",
        style: null,
        blocks: ["cards-discover"],
        defaultContent: [".horizontalAccordion .c_550-tab-headline"]
      },
      {
        id: "section-6",
        name: "Awards",
        selector: ".c_431.c_431--secondary-layout",
        style: null,
        blocks: ["columns-dual"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "Recall Notice",
        selector: ".usg-section--shaded-background",
        style: "grey",
        blocks: [],
        defaultContent: [".c_008"]
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
