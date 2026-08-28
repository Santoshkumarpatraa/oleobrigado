// Shared markup for SiteHeader / SiteFooter / ProductCard, translated from the
// dc.html components. One DOM per component (not separate desktop/mobile pages) —
// visibility between the two is handled purely by CSS (see .only-desktop / .only-mobile).

function esc(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : String(str);
  return div.innerHTML;
}

// Every link — internal pages and real oleobrigado.com destinations alike —
// opens in the same tab.
function linkAttrs(href) {
  return `href="${esc(href)}"`;
}

// Merchandising badges (NEW / BEST VALUE / STAFF PICK / point scores) — the real
// catalog doesn't carry these per-bottle, so they're assigned deterministically
// from each product's id (same badge every time, shared between the browse
// card and its detail page) rather than genuinely random or sourced from any
// real critic. About a third of bottles get one, matching how sparingly the
// original design used them.
const BADGE_POOL = ["NEW", "BEST VALUE", "STAFF PICK", "90 PTS", "91 PTS", "92 PTS", "93 PTS", "94 PTS", "95 PTS"];
function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}
// Homepage category tiles: count and link are computed from the real catalog
// rather than hand-typed, so they can't drift out of sync with it.
function categoryMatches(c, p) {
  if (c.filter.seasonal) return SEASONAL_IDS.includes(p.id);
  if (c.filter.country && p.country !== c.filter.country) return false;
  if (c.filter.style && p.style !== c.filter.style) return false;
  return true;
}
function categoryCount(c) {
  return PRODUCTS.filter(p => categoryMatches(c, p)).length;
}
function categoryHref(c) {
  if (c.filter.seasonal) return "browse.html?seasonal=1";
  const params = new URLSearchParams();
  if (c.filter.country) params.set("country", c.filter.country);
  if (c.filter.style) params.set("style", c.filter.style);
  return "browse.html?" + params.toString();
}

function pickBadge(p) {
  if (p.badge) return p.badge;
  const h = hashStr(p.id);
  if (h % 100 >= 32) return "";
  return BADGE_POOL[h % BADGE_POOL.length];
}

function renderProductCard(p) {
  const badgeText = pickBadge(p);
  const badge = badgeText
    ? `<div class="product-card__badge">${esc(badgeText)}</div>`
    : "";
  const priceNum = parseFloat(String(p.price).replace(/[^0-9.]/g, "")) || 0;
  // Real bottle photos come straight from oleobrigado.com's own product pages;
  // if one fails to load (or there isn't one, like the hero bottle), fall back
  // to the placeholder the original design used everywhere.
  const img = p.image
    ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='inline'">`
    : "";
  const fallback = `<span${p.image ? ' style="display:none"' : ""}>bottle shot</span>`;
  return `
    <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-card" data-price="${priceNum}">
      <div class="product-card__image">
        ${img}
        ${fallback}
        ${badge}
      </div>
      <div class="product-card__body">
        <div class="product-card__producer">${esc(p.producer)}</div>
        <div class="product-card__title">${esc(p.title)}</div>
        <div class="product-card__note">${esc(p.note)}</div>
        <div class="product-card__price-row">
          <div class="product-card__price">${esc(p.price)}</div>
          <div class="product-card__case-price">${esc(p.casePrice)}</div>
        </div>
        <button type="button" class="product-card__cta" data-add-to-cart>Add to cart</button>
      </div>
    </a>`;
}

function renderProductGrid(products) {
  return products.map(renderProductCard).join("");
}

function renderUtilDropdown(item) {
  if (!item.items.length) return "";
  return `
    <div class="util-dropdown" data-util-dropdown="${esc(item.label)}">
      ${item.items.map(s => `<a ${linkAttrs(s.href)}>${esc(s.label)}</a>`).join("")}
    </div>`;
}

function renderUtilNav() {
  return TOP_NAV.map(item => {
    const hasMenu = item.items.length > 0;
    const caret = hasMenu ? `<span class="util-nav__caret" data-util-caret="${esc(item.label)}">▾</span>` : "";
    const tag = hasMenu ? "button" : "a";
    const attrs = hasMenu
      ? `type="button" class="util-nav__link" data-util-toggle="${esc(item.label)}"`
      : `${linkAttrs(item.href)} class="util-nav__link"`;
    return `
      <div class="util-nav__item">
        <${tag} ${attrs}><span>${esc(item.label)}</span>${caret}</${tag}>
        ${renderUtilDropdown(item)}
      </div>`;
  }).join("");
}

function renderShopNav(active) {
  return SHOP_NAV.map(n => {
    const cls = n.label === active ? "active" : "";
    return `<a ${linkAttrs(n.href)} class="${cls}" data-shop-nav="${esc(n.label)}">${esc(n.label)}</a>`;
  }).join("");
}

function renderDrawerInfo() {
  return TOP_NAV.map(item => {
    const hasMenu = item.items.length > 0;
    const caret = hasMenu ? `<span class="drawer__caret" data-drawer-sign="${esc(item.label)}">+</span>` : "";
    const sub = hasMenu
      ? `<div data-drawer-sub="${esc(item.label)}" hidden>${item.items.map(s => `<a ${linkAttrs(s.href)} class="drawer__sub">${esc(s.label)}</a>`).join("")}</div>`
      : "";
    const toggleAttr = hasMenu ? `data-drawer-toggle="${esc(item.label)}"` : "";
    return `
      <div class="drawer__info-item">
        <a ${linkAttrs(item.href)} class="drawer__info-toggle" ${toggleAttr}>
          <span>${esc(item.label)}</span>${caret}
        </a>
        ${sub}
      </div>`;
  }).join("");
}

function renderHeader(active) {
  return `
    <div class="only-desktop">
      <div class="util-bar">
        <div class="util-bar__msg">National importer · Direct distribution in NY &amp; NJ</div>
        <nav class="util-nav" aria-label="Company and trade">${renderUtilNav()}</nav>
      </div>
      <div class="main-row">
        <a href="index.html" class="logo-link">
          <img src="assets/ole-logo-round.png" alt="Olé &amp; Obrigado" width="64" height="64">
        </a>
        <div class="shop-nav-wrap">
          <nav class="shop-nav" aria-label="Shop">${renderShopNav(active)}</nav>
          ${renderSearchForm()}
          <button type="button" class="cart-link" data-cart-badge>CART (0)</button>
        </div>
      </div>
    </div>

    <div class="only-mobile">
      <div class="util-bar--mobile">Importer · Direct distribution NY &amp; NJ</div>
      <div class="mobile-topbar">
        <a href="index.html" class="logo-link">
          <img src="assets/ole-logo-round.png" alt="Olé &amp; Obrigado" width="44" height="44">
        </a>
        <div class="mobile-topbar__right">
          <button type="button" class="mobile-cart" data-cart-badge>CART (0)</button>
          <button type="button" class="hamburger" data-drawer-open aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-search-wrap">
        ${renderSearchForm()}
      </div>
    </div>

    <div class="drawer-backdrop" data-drawer-backdrop></div>
    <div class="drawer" data-drawer>
      <div class="drawer__head">
        <div class="drawer__label">Menu</div>
        <button type="button" class="drawer__close" data-drawer-close aria-label="Close menu">✕</button>
      </div>
      <div class="drawer__body">
        ${SHOP_NAV.map(n => `<a ${linkAttrs(n.href)} class="drawer__shop-link">${esc(n.label)}</a>`).join("")}
        <div class="drawer__section-label">Company &amp; trade</div>
        ${renderDrawerInfo()}
      </div>
      <div class="drawer__foot">
        <a href="browse.html">Search</a>
        <a href="https://www.instagram.com/oleobrigado/">Instagram</a>
        <a href="https://www.facebook.com/OleObrigado/">Facebook</a>
      </div>
    </div>`;
}

function renderSearchForm() {
  return `
    <form class="search-box" action="browse.html" method="get" data-search-form>
      <span class="search-dot" aria-hidden="true"></span>
      <input type="search" name="q" class="search-input" placeholder="Grape, region, producer" autocomplete="off">
    </form>`;
}

function renderFooter() {
  const colsDesktop = FOOTER_COLS.map(c => `
    <div class="footer-col">
      <div class="footer-col__title">${esc(c.title)}</div>
      ${c.links.map(l => `<a ${linkAttrs(l.href)}>${esc(l.label)}</a>`).join("")}
    </div>`).join("");

  const colsMobile = FOOTER_COLS.map(c => `
    <div class="footer-col">
      <div class="footer-col__title">${esc(c.title)}</div>
      <div class="footer-col__links">
        ${c.links.map(l => `<a ${linkAttrs(l.href)}>${esc(l.label)}</a>`).join("")}
      </div>
    </div>`).join("");

  return `
    <div class="only-desktop">
      <div class="site-footer">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="${OO}/">
              <img src="assets/ole-logo-round.png" alt="Olé &amp; Obrigado" width="52" height="52">
            </a>
            <p>Olé &amp; Obrigado represents a collection of fine wines crafted by family-owned wineries in Spain and Portugal. A collaboration among business partners Patrick Mata and Alberto Orte, Olé &amp; Obrigado is a highly specialized wine import company offering the most comprehensive and well-curated collection of wines from the Iberian Peninsula available in the U.S.</p>
            <div class="social-row">
              <a href="https://www.instagram.com/oleobrigado/">Instagram</a>
              <a href="https://www.facebook.com/OleObrigado/">Facebook</a>
            </div>
          </div>
        </div>
        <div class="footer-grid">
          ${colsDesktop}
        </div>
        <div class="footer-bottom">
          <div class="footer-bottom__copy">© 2026 Olé &amp; Obrigado Imports</div>
          <div class="footer-bottom__legal">You must be 21 or older to purchase. Please enjoy responsibly.</div>
          <div class="footer-bottom__links">
            <a href="#">Shipping &amp; states</a>
            <a href="#">Returns</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
      </div>
    </div>
    <div class="only-mobile">
      <div class="site-footer site-footer--mobile">
        <div class="footer-brand footer-brand--mobile">
          <a href="${OO}/">
            <img src="assets/ole-logo-round.png" alt="Olé &amp; Obrigado" width="52" height="52">
          </a>
          <p>Olé &amp; Obrigado represents a collection of fine wines crafted by family-owned wineries in Spain and Portugal. A collaboration among business partners Patrick Mata and Alberto Orte, Olé &amp; Obrigado is a highly specialized wine import company offering the most comprehensive and well-curated collection of wines from the Iberian Peninsula available in the U.S.</p>
        </div>
        ${colsMobile}
        <div class="footer-bottom">
          <div class="social-row">
            <a href="https://www.instagram.com/oleobrigado/">Instagram</a>
            <a href="https://www.facebook.com/OleObrigado/">Facebook</a>
          </div>
          <div class="footer-bottom__legal">You must be 21 or older to purchase. Please enjoy responsibly.</div>
          <div class="footer-bottom__copy">© 2026 Olé &amp; Obrigado Imports</div>
        </div>
      </div>
    </div>`;
}

function mountSiteChrome() {
  document.querySelectorAll("[data-site-header]").forEach(el => {
    el.innerHTML = renderHeader(el.getAttribute("data-active") || "");
  });
  document.querySelectorAll("[data-site-footer]").forEach(el => {
    el.innerHTML = renderFooter();
  });
  document.querySelectorAll("[data-product-grid]").forEach(el => {
    // "browse" (filter/sort/search-driven) and "related" (depends on which
    // product page you're on) are owned by browse.js / product.js — skip both.
    const key = el.getAttribute("data-product-grid");
    if (key === "browse" || key === "related") return;
    const list = { seasonal: SEASONAL_PRODUCTS }[key] || [];
    el.innerHTML = renderProductGrid(list);
  });
  document.querySelectorAll("[data-category-grid]").forEach(el => {
    const limit = el.hasAttribute("data-limit") ? Number(el.getAttribute("data-limit")) : CATEGORIES.length;
    el.innerHTML = CATEGORIES.slice(0, limit).map(c => `
      <a href="${esc(categoryHref(c))}" class="category-tile">
        <div class="category-tile__dot" style="background:${c.fill};border:${c.ring}"></div>
        <div>
          <div class="category-tile__name">${esc(c.name)}</div>
          <div class="category-tile__count">${categoryCount(c)} bottles</div>
        </div>
      </a>`).join("");
  });
  document.querySelectorAll("[data-browse-all-link]").forEach(el => {
    el.href = "browse.html";
    el.textContent = `Browse all ${PRODUCTS.length} bottles`;
  });
  document.querySelectorAll("[data-seasonal-link]").forEach(el => {
    el.href = "browse.html?seasonal=1";
    el.textContent = `See all ${SEASONAL_PRODUCTS.length} →`;
  });
  document.querySelectorAll("[data-trust-list]").forEach(el => {
    el.innerHTML = TRUST.map(t => `
      <div class="trust-item">
        <div class="trust-item__h">${esc(t.h)}</div>
        <p class="trust-item__p">${esc(t.p)}</p>
      </div>`).join("");
  });
}

// Shared by product.js: one spec row (Producer / Region / Grape / ... — only
// ever real, verified fields, since there's no per-bottle vintage/ABV/farming
// data in the source catalog).
function renderSpecRow(k, v) {
  return `
    <div class="spec-row">
      <div class="spec-row__k">${esc(k)}</div>
      <div class="spec-row__v">${esc(v)}</div>
    </div>`;
}
