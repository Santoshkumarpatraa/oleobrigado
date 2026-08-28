// Browse page: filter sidebar (desktop) + mobile filter sheet + sort + search +
// chips + pagination — all driven off the shared PRODUCTS catalog (data.js), so
// results, counts, chips and the "N results" text are always the real, current
// answer instead of decorative state layered on a fixed 6-item grid.

const PRICE_BUCKETS = [
  { key: "under20", label: "Under $20", test: p => p.priceNum < 20 },
  { key: "20-30", label: "$20 – $30", test: p => p.priceNum >= 20 && p.priceNum < 30 },
  { key: "30-50", label: "$30 – $50", test: p => p.priceNum >= 30 && p.priceNum < 50 },
  { key: "50plus", label: "$50+", test: p => p.priceNum >= 50 }
];

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

// The real catalog lists blends as one raw string per bottle (e.g. "Tinto Fino
// (Tempranillo), Merlot, Albillo Mayor" or "Garnacha, Cariñena & Syrah") — split
// on commas/ampersands so each variety becomes its own filterable facet value
// instead of every unique blend combination becoming a one-off row.
// The source listings spell a few grapes inconsistently across bottles (missing
// accents, one typo) — normalize the clear cases so they collapse into a single
// facet row instead of splitting an otherwise-identical variety into two.
const GRAPE_ALIASES = {
  "Mencia": "Mencía",
  "Codega": "Códega",
  "Pedro Ximenez": "Pedro Ximénez",
  "Touriga Nacional": "Touriga Naçional",
  "Tinta Amarella": "Tinta Amarela",
  "Dozelinho Tinto": "Donzelinho Tinto",
  "Alvarinho (Albariño )": "Alvarinho (Albariño)"
};

function parseGrapes(grapeStr) {
  if (!grapeStr) return [];
  return grapeStr
    .split(/,|&/)
    .map(s => s.trim().replace(/\.$/, ""))
    .filter(Boolean)
    .map(g => GRAPE_ALIASES[g] || g);
}

function buildFacetDefs() {
  const countries = ["Spain", "Portugal"];
  const styles = ["White", "Red", "Rosé", "Sparkling", "Gin & spirits"];
  const regions = uniqueSorted(PRODUCTS.map(p => p.region));
  const grapes = uniqueSorted(PRODUCTS.flatMap(p => parseGrapes(p.grape)));

  return [
    { key: "country", label: "Country", rows: countries.map(v => ({ value: v, name: v, test: p => p.country === v })) },
    { key: "style", label: "Style", rows: styles.map(v => ({ value: v, name: v, test: p => p.style === v })) },
    { key: "region", label: "Region", rows: regions.map(v => ({ value: v, name: v, test: p => p.region === v })) },
    { key: "price", label: "Price", rows: PRICE_BUCKETS.map(b => ({ value: b.key, name: b.label, test: b.test })) },
    { key: "grape", label: "Grape", rows: grapes.map(v => ({ value: v, name: v, test: p => parseGrapes(p.grape).includes(v) })) }
  ];
}

const FACET_DEFS = buildFacetDefs();

// state
let checked = {}; // { "style:White": true, ... }
let seasonalOnly = false;
let searchTerm = "";
let sortMode = "Featured";
let visibleCount = 6;
let sheetExpanded = new Set(["Country", "Style"]);

function checkedKey(groupKey, value) {
  return groupKey + ":" + value;
}

function isChecked(groupKey, value) {
  return !!checked[checkedKey(groupKey, value)];
}

function toggleChecked(groupKey, value) {
  const key = checkedKey(groupKey, value);
  checked[key] = !checked[key];
  visibleCount = 6;
  renderAll();
}

function clearAllFilters() {
  checked = {};
  seasonalOnly = false;
  visibleCount = 6;
  renderAll();
}

function activeRowsInGroup(group) {
  return group.rows.filter(r => isChecked(group.key, r.value));
}

function matchesProduct(p) {
  if (seasonalOnly && !SEASONAL_IDS.includes(p.id)) return false;
  for (const group of FACET_DEFS) {
    const active = activeRowsInGroup(group);
    if (active.length && !active.some(r => r.test(p))) return false;
  }
  if (searchTerm) {
    const haystack = (p.producer + " " + p.title + " " + p.note + " " + p.region + " " + p.grape).toLowerCase();
    if (!haystack.includes(searchTerm.toLowerCase())) return false;
  }
  return true;
}

function filteredSortedProducts() {
  const list = PRODUCTS.filter(matchesProduct);
  if (sortMode === "Price: low to high") list.sort((a, b) => a.priceNum - b.priceNum);
  else if (sortMode === "Price: high to low") list.sort((a, b) => b.priceNum - a.priceNum);
  return list;
}

function activeCount() {
  let n = Object.values(checked).filter(Boolean).length;
  if (seasonalOnly) n += 1;
  return n;
}

document.addEventListener("DOMContentLoaded", () => {
  applyUrlParams();
  wireStaticControls();
  renderAll();
});

function applyUrlParams() {
  const params = new URLSearchParams(location.search);
  const q = params.get("q");
  if (q) searchTerm = q;
  const style = params.get("style");
  if (style && FACET_DEFS.find(g => g.key === "style").rows.some(r => r.value === style)) {
    checked[checkedKey("style", style)] = true;
  }
  const region = params.get("region");
  if (region && FACET_DEFS.find(g => g.key === "region").rows.some(r => r.value === region)) {
    checked[checkedKey("region", region)] = true;
  }
  const country = params.get("country");
  if (country && FACET_DEFS.find(g => g.key === "country").rows.some(r => r.value === country)) {
    checked[checkedKey("country", country)] = true;
  }
  if (params.get("seasonal") === "1") seasonalOnly = true;

  document.querySelectorAll('[data-search-form] .search-input').forEach(input => (input.value = searchTerm));
}

function wireStaticControls() {
  // Live search: on browse.html, the header search box filters in place instead
  // of doing a full-page GET navigation.
  document.querySelectorAll("[data-search-form]").forEach(form => {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const input = form.querySelector(".search-input");
      searchTerm = input.value.trim();
      visibleCount = 6;
      renderAll();
    });
    const input = form.querySelector(".search-input");
    let debounce;
    input.addEventListener("input", () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchTerm = input.value.trim();
        visibleCount = 6;
        renderAll();
      }, 200);
    });
  });

  wireSheetOpenClose();
  wireSortDropdown();
  wireLoadMore();
}

function activeNavLabel() {
  if (seasonalOnly) return "Seasonal";
  const styleRows = activeRowsInGroup(FACET_DEFS.find(g => g.key === "style"));
  if (styleRows.length === 1 && styleRows[0].value === "Gin & spirits" && activeCount() === 1) return "Spirits";
  return "Wine";
}

function renderAll() {
  const results = filteredSortedProducts();
  renderSidebar();
  renderSheet();
  renderChipsAndBadges(results.length);
  renderResults(results);
  renderShopNavActive();
  // Keep the desktop and mobile search inputs (two separate DOM nodes) in sync,
  // so a value set by URL, a chip removal, or typing in one is reflected in both.
  document.querySelectorAll(".search-input").forEach(input => {
    if (input.value !== searchTerm && document.activeElement !== input) input.value = searchTerm;
  });
}

function renderShopNavActive() {
  const label = activeNavLabel();
  document.querySelectorAll("[data-shop-nav]").forEach(a => {
    a.classList.toggle("active", a.getAttribute("data-shop-nav") === label);
  });
}

function escAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function filterRowMarkup(group, row, size) {
  const on = isChecked(group.key, row.value);
  const boxClass = size === "sheet" ? "sheet-row__box" : "filter-row__box";
  const rowClass = size === "sheet" ? "sheet-row" : "filter-row";
  const nameClass = size === "sheet" ? "sheet-row__name" : "filter-row__name";
  const countClass = size === "sheet" ? "sheet-row__count" : "filter-row__count";
  const count = PRODUCTS.filter(row.test).length;
  return `
    <button type="button" class="${rowClass} ${on ? "is-checked" : ""}" data-filter-group="${group.key}" data-filter-value="${escAttr(row.value)}">
      <span class="${boxClass}">${on ? "✓" : ""}</span>
      <span class="${nameClass}">${escAttr(row.name)}</span>
      <span class="${countClass}">${count}</span>
    </button>`;
}

function renderSidebar() {
  const el = document.querySelector("[data-filter-sidebar]");
  if (!el) return;
  el.innerHTML = `
    <div class="filter-sidebar__head">
      <div class="filter-sidebar__title">Filter <span class="filter-badge" data-filter-badge>${activeCount()}</span></div>
      <button type="button" class="filter-sidebar__clear" data-filter-clear>Clear</button>
    </div>
    ${FACET_DEFS.map(g => `
      <div class="filter-group">
        <div class="filter-group__label">${g.label}</div>
        ${g.rows.map(r => filterRowMarkup(g, r, "sidebar")).join("")}
      </div>`).join("")}
  `;
}

function renderSheet() {
  const el = document.querySelector("[data-filter-sheet-body]");
  if (!el) return;
  el.innerHTML = FACET_DEFS.map(g => {
    const open = sheetExpanded.has(g.label);
    return `
      <div class="sheet-group">
        <button type="button" class="sheet-group__head" data-sheet-group-toggle="${g.label}">
          <span class="sheet-group__label">${g.label}</span>
          <span class="sheet-group__chevron">${open ? "−" : "+"}</span>
        </button>
        ${open ? g.rows.map(r => filterRowMarkup(g, r, "sheet")).join("") : ""}
      </div>`;
  }).join("");
  document.querySelectorAll("[data-filter-sheet-badge]").forEach(b => (b.textContent = activeCount()));
}

function renderChipsAndBadges(resultCount) {
  const chips = [];
  if (seasonalOnly) chips.push({ special: "seasonal", label: "Seasonal picks" });
  FACET_DEFS.forEach(g => g.rows.forEach(r => {
    if (isChecked(g.key, r.value)) chips.push({ group: g.key, value: r.value, label: r.name });
  }));
  if (searchTerm) chips.push({ special: "search", label: `"${searchTerm}"` });

  document.querySelectorAll("[data-chip-row]").forEach(row => {
    row.innerHTML = chips.map(c => {
      if (c.special === "seasonal") return chipMarkup(c.label, `data-chip-seasonal`);
      if (c.special === "search") return chipMarkup(c.label, `data-chip-search`);
      return chipMarkup(c.label, `data-filter-group="${c.group}" data-filter-value="${escAttr(c.value)}"`);
    }).join("");
  });

  document.querySelectorAll("[data-filter-badge]").forEach(b => (b.textContent = activeCount()));
  document.querySelectorAll("[data-filter-sheet-badge]").forEach(b => (b.textContent = activeCount()));
  document.querySelectorAll("[data-result-count]").forEach(el => (el.textContent = `${resultCount} result${resultCount === 1 ? "" : "s"}`));
}

function chipMarkup(label, attrs) {
  return `<button type="button" class="chip" data-chip-remove ${attrs}><span>${escAttr(label)}</span><span class="chip__x">✕</span></button>`;
}

function renderResults(results) {
  const grid = document.querySelector('[data-product-grid="browse"]');
  if (grid) grid.innerHTML = renderProductGrid(results.slice(0, visibleCount));

  const shown = Math.min(visibleCount, results.length);
  document.querySelectorAll("[data-showing-count]").forEach(el => (el.textContent = `Showing ${shown} of ${results.length}`));
  document.querySelectorAll("[data-load-more]").forEach(btn => {
    const done = shown >= results.length;
    btn.hidden = done;
  });
  document.querySelectorAll("[data-sheet-apply]").forEach(btn => (btn.textContent = `Show ${results.length} results`));

  const emptyState = document.querySelector("[data-empty-state]");
  if (emptyState) emptyState.hidden = results.length > 0;
}

document.addEventListener("click", e => {
  const row = e.target.closest("[data-filter-group][data-filter-value]");
  if (row) {
    toggleChecked(row.getAttribute("data-filter-group"), row.getAttribute("data-filter-value"));
    return;
  }
  if (e.target.closest("[data-chip-seasonal]")) {
    seasonalOnly = false;
    visibleCount = 6;
    renderAll();
    return;
  }
  if (e.target.closest("[data-chip-search]")) {
    searchTerm = "";
    document.querySelectorAll(".search-input").forEach(i => (i.value = ""));
    visibleCount = 6;
    renderAll();
    return;
  }
  if (e.target.closest("[data-filter-clear]") || e.target.closest("[data-sheet-clear]")) {
    clearAllFilters();
    return;
  }
  const groupToggle = e.target.closest("[data-sheet-group-toggle]");
  if (groupToggle) {
    const label = groupToggle.getAttribute("data-sheet-group-toggle");
    if (sheetExpanded.has(label)) sheetExpanded.delete(label);
    else sheetExpanded.add(label);
    renderSheet();
    return;
  }
});

function wireSheetOpenClose() {
  const backdrop = document.querySelector("[data-sheet-backdrop]");
  const sheet = document.querySelector("[data-filter-sheet]");
  const openBtn = document.querySelector("[data-toolbar-filter]");
  const closeSheet = () => {
    if (sheet) sheet.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
  };
  if (openBtn) {
    openBtn.addEventListener("click", () => {
      if (sheet) sheet.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeSheet);
  document.querySelectorAll("[data-sheet-apply]").forEach(btn => btn.addEventListener("click", closeSheet));
}

const SORT_OPTIONS = ["Featured", "Price: low to high", "Price: high to low"];

function wireSortDropdown() {
  document.querySelectorAll("[data-sort-toggle]").forEach(toggle => {
    const panel = toggle.parentElement.querySelector("[data-sort-panel]");
    if (!panel) return;
    panel.innerHTML = SORT_OPTIONS.map(o => `<a href="#" data-sort-option="${o}">${o}</a>`).join("");
    toggle.addEventListener("click", e => {
      e.preventDefault();
      const willOpen = !panel.classList.contains("is-open");
      document.querySelectorAll("[data-sort-panel]").forEach(p => p.classList.remove("is-open"));
      panel.classList.toggle("is-open", willOpen);
    });
    panel.addEventListener("click", e => {
      const opt = e.target.closest("[data-sort-option]");
      if (!opt) return;
      e.preventDefault();
      sortMode = opt.getAttribute("data-sort-option");
      document.querySelectorAll("[data-sort-label]").forEach(l => (l.textContent = `Sort: ${sortMode}`));
      panel.classList.remove("is-open");
      visibleCount = 6;
      renderAll();
    });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-sort-toggle]") && !e.target.closest("[data-sort-panel]")) {
      document.querySelectorAll("[data-sort-panel]").forEach(p => p.classList.remove("is-open"));
    }
  });
}

function wireLoadMore() {
  document.querySelectorAll("[data-load-more]").forEach(btn => {
    btn.addEventListener("click", () => {
      visibleCount += 6;
      renderAll();
    });
  });
}
