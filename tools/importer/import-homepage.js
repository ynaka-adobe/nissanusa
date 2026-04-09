/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroPromoParser from './parsers/hero-promo.js';
import cardsActionParser from './parsers/cards-action.js';
import carouselVehicleParser from './parsers/carousel-vehicle.js';
import advancedTabsParser from './parsers/advanced-tabs.js';
import cardsDiscoverParser from './parsers/cards-discover.js';
import columnsHighlightParser from './parsers/columns-highlight.js';
import columnsDualParser from './parsers/columns-dual.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nissanusa-cleanup.js';
import sectionsTransformer from './transformers/nissanusa-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-promo': heroPromoParser,
  'cards-action': cardsActionParser,
  'carousel-vehicle': carouselVehicleParser,
  'advanced-tabs': advancedTabsParser,
  'cards-discover': cardsDiscoverParser,
  'columns-highlight': columnsHighlightParser,
  'columns-dual': columnsDualParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Nissan USA homepage with hero, vehicle showcases, promotions, and brand content',
  urls: [
    'https://www.nissanusa.com/',
  ],
  blocks: [
    {
      name: 'hero-promo',
      instances: [
        '.pfaMedia .carousel-pfa_slide_hero',
        '.pfaMedia .carousel-pfa_slide_content-holder',
      ],
    },
    {
      name: 'cards-action',
      instances: [
        '.c_063-0.next-gen',
      ],
    },
    {
      name: 'carousel-vehicle',
      instances: [
        '.vehiclePFA .c_431-slide-container',
      ],
    },
    {
      name: 'advanced-tabs',
      instances: [
        '.vehiclePicker .c_431-nav-container',
        '.vehiclePicker .c_431-categories',
      ],
    },
    {
      name: 'cards-discover',
      instances: [
        '.horizontalAccordion .c_550',
      ],
    },
    {
      name: 'columns-highlight',
      instances: [
        '.c_271.c_271--main-container',
        '.nextGenMedia .c_274',
      ],
    },
    {
      name: 'columns-dual',
      instances: [
        '.c_431.c_431--secondary-layout',
      ],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Promotional Banner',
      selector: '.pfaMedia.section',
      style: null,
      blocks: ['hero-promo', 'cards-action'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Vehicle Showcase',
      selector: '.vehiclePFA',
      style: null,
      blocks: ['carousel-vehicle', 'advanced-tabs'],
      defaultContent: ['.onitOffers .c_258'],
    },
    {
      id: 'section-3',
      name: 'Fastest Growing Brand',
      selector: '.c_271.c_271--main-container.c_271--center',
      style: null,
      blocks: ['columns-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Pathfinder Campaign',
      selector: '.nextGenMedia.section',
      style: 'dark',
      blocks: ['columns-highlight'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Discover Grid',
      selector: '.horizontalAccordion.section',
      style: null,
      blocks: ['cards-discover'],
      defaultContent: ['.horizontalAccordion .c_550-tab-headline'],
    },
    {
      id: 'section-6',
      name: 'Awards',
      selector: '.c_431.c_431--secondary-layout',
      style: null,
      blocks: ['columns-dual'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'Recall Notice',
      selector: '.usg-section--shaded-background',
      style: 'grey',
      blocks: [],
      defaultContent: ['.c_008'],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
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
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
