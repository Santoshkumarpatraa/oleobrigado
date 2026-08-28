// Product detail page — fully driven by PRODUCTS (data.js) via ?id=, so every
// one of the 123 real bottles gets its own accurate page instead of every
// product card landing on the same hardcoded item.

let qty = 2; // matches the design's default stepper value
let currentProduct = null;

document.addEventListener("DOMContentLoaded", () => {
  currentProduct = resolveProduct();
  renderProduct(currentProduct);
  renderQty();
});

function resolveProduct() {
  const id = new URLSearchParams(location.search).get("id");
  return (id && PRODUCTS.find(p => p.id === id)) || PRODUCTS.find(p => p.id === "sacristia-ab-manzanilla") || PRODUCTS[0];
}

function firstGrape(grapeStr) {
  if (!grapeStr) return "";
  return grapeStr.split(/,|&/)[0].trim().replace(/\.$/, "");
}

function renderProduct(p) {
  document.title = `${p.title} — Olé & Obrigado`;
  document.querySelector("[data-pd-doctitle]").textContent = `${p.title} — Olé & Obrigado`;

  // Breadcrumb + mobile back link
  const crumbs = [{ label: "Wine", href: "browse.html" }];
  crumbs.push({ label: p.country, href: `browse.html?country=${encodeURIComponent(p.country)}` });
  if (p.region) crumbs.push({ label: p.region, href: `browse.html?region=${encodeURIComponent(p.region)}` });
  document.querySelector("[data-pd-breadcrumb]").innerHTML =
    crumbs.map(c => `<a href="${esc(c.href)}">${esc(c.label)}</a><span>/</span>`).join("") +
    `<span class="breadcrumb__current">${esc(p.title)}</span>`;

  const backScope = p.region || p.country;
  const backHref = p.region ? `browse.html?region=${encodeURIComponent(p.region)}` : `browse.html?country=${encodeURIComponent(p.country)}`;
  const backEl = document.querySelector("[data-pd-back]");
  backEl.href = backHref;
  backEl.textContent = `← ${backScope}`;

  // Gallery
  const gallery = document.querySelector("[data-pd-gallery]");
  const galleryImg = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">`
    : "";
  gallery.innerHTML = `${galleryImg}<span${p.image ? ' style="display:none"' : ""}>Bottle shot, on-white</span>`;

  document.querySelector("[data-pd-producer]").textContent = `${p.producer} · ${p.region || p.country}`;
  document.querySelector("[data-pd-title]").textContent = p.title;

  // Badges: the shared merchandising badge (if this bottle has one) plus the
  // real region and lead grape variety — no fabricated vintage/critic claims.
  const badges = [];
  const merch = pickBadge(p);
  if (merch) badges.push(`<div class="pd-badge pd-badge--dark">${esc(merch)}</div>`);
  if (p.region) badges.push(`<div class="pd-badge ${merch ? "pd-badge--outline" : "pd-badge--dark"}">${esc(p.region.toUpperCase())}</div>`);
  const grape = firstGrape(p.grape);
  if (grape) badges.push(`<div class="pd-badge pd-badge--outline">${esc(grape.toUpperCase())}</div>`);
  document.querySelector("[data-pd-badges]").innerHTML = badges.join("");

  document.querySelector("[data-pd-desc]").textContent =
    `${p.note} Imported from ${p.country} by Olé & Obrigado.`;

  document.querySelectorAll("[data-pd-price]").forEach(el => (el.textContent = p.price));
  const caseMatch = p.casePrice.match(/\$([\d.]+) at (\d+)/);
  if (caseMatch) {
    const caseUnit = parseFloat(caseMatch[1]);
    const caseSize = parseInt(caseMatch[2], 10);
    const savings = (p.priceNum - caseUnit) * caseSize;
    document.querySelector("[data-pd-case-note]").innerHTML =
      `$${caseUnit.toFixed(2)}/bottle when you buy any ${caseSize} · <em>save $${savings.toFixed(2)}</em>`;
  }
  document.querySelector("[data-pd-buybar-case]").textContent = p.casePrice;

  // Specs — only fields the real catalog actually has.
  const specs = [
    { k: "Producer", v: p.producer },
    { k: "Country", v: p.country }
  ];
  if (p.region) specs.push({ k: "Region", v: p.region });
  if (p.grape) specs.push({ k: "Grape", v: p.grape });
  specs.push({ k: "Style", v: p.style });
  document.querySelector("[data-pd-specs]").innerHTML = specs.map(s => renderSpecRow(s.k, s.v)).join("");

  renderRelated(p);
}

function renderRelated(p) {
  let related = PRODUCTS.filter(x => x.producer === p.producer && x.id !== p.id);
  let heading, linkLabel, linkHref;
  if (related.length >= 1) {
    heading = `More from ${p.producer}`;
    linkLabel = `All ${p.producer} bottles →`;
  } else if (p.region) {
    related = PRODUCTS.filter(x => x.region === p.region && x.id !== p.id);
    heading = `More from ${p.region}`;
    linkLabel = `All ${p.region} bottles →`;
  } else {
    related = PRODUCTS.filter(x => x.style === p.style && x.id !== p.id);
    heading = `More ${p.style}`;
    linkLabel = "See more →";
  }
  linkHref = p.region ? `browse.html?region=${encodeURIComponent(p.region)}` : `browse.html?country=${encodeURIComponent(p.country)}`;

  document.querySelector("[data-pd-related-title]").textContent = heading;
  const linkEl = document.querySelector("[data-pd-related-link]");
  linkEl.textContent = linkLabel;
  linkEl.href = linkHref;
  document.querySelector('[data-product-grid="related"]').innerHTML = renderProductGrid(related.slice(0, 4));
}

function renderQty() {
  document.querySelectorAll("[data-qty-value]").forEach(el => (el.textContent = qty));
}

document.addEventListener("click", e => {
  if (e.target.closest("[data-qty-decrease]")) {
    qty = Math.max(1, qty - 1);
    renderQty();
    return;
  }
  if (e.target.closest("[data-qty-increase]")) {
    qty = qty + 1;
    renderQty();
    return;
  }
  const addQtyBtn = e.target.closest("[data-add-to-cart-qty]");
  if (addQtyBtn) {
    addToCart(qty);
    flashAdded(addQtyBtn);
    return;
  }
});
