export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length < 2) return;

  // Row 0 = background image, Row 1 = text content
  const imageRow = rows[0];
  const contentRow = rows[1];

  // Set up background image
  const img = imageRow.querySelector('img');
  if (img) {
    imageRow.classList.add('hero-promo-background');
  } else {
    block.classList.add('no-image');
  }

  // Set up content overlay
  contentRow.classList.add('hero-promo-foreground');
}
