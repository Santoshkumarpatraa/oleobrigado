// Browse page: filter sidebar (desktop) + mobile filter sheet + sort + chips.
// A single filter state drives all three surfaces so they can never disagree —
// that three-way mismatch (badge vs. sheet vs. chips) was one of the defects
// the design review called out and fixed.

let filterState = FILTER_GROUPS.map(g => ({
  label: g.label,
  key: g.key,
  rows: g.rows.map(r => ({ name: r.name, count: r.count, on: r.on }))
}));

let sheetExpanded = new Set(["Country", "Style"]); // matches the design: first two groups open by default

document.addEventListener("DOMContentLoaded", () => {
  renderSidebar();
  renderSheet();
  renderChipsAndBadges();
  wireSortDropdown();
  wireSheetOpenClose();
  wireLoadMore();
});

function activeCount() {
  return filterState.reduce((n, g) => n + g.rows.filter(r => r.on).length, 0);
}

function toggleFilter(groupKey, name) {
  const group = filterState.find(g => g.key === groupKey);
  if (!group) return;
  const row = group.rows.find(r => r.name === name);
  if (!row) return;
  row.on = !row.on;
  renderSidebar();
  renderSheet();
  renderChipsAndBadges();
}

function clearFilters() {
  filterState.forEach(g => g.rows.forEach(r => (r.on = false)));
  renderSidebar();
  renderSheet();
  renderChipsAndBadges();
}

function filterRowMarkup(groupKey, r, size) {
  const boxClass = size === "sheet" ? "sheet-row__box" : "filter-row__box";
  const rowClass = size === "sheet" ? "sheet-row" : "filter-row";
  const nameClass = size === "sheet" ? "sheet-row__name" : "filter-row__name";
  const countClass = size === "sheet" ? "sheet-row__count" : "filter-row__count";
  return `
    <button type="button" class="${rowClass} ${r.on ? "is-checked" : ""}" data-filter-group="${groupKey}" data-filter-name="${escAttr(r.name)}">
      <span class="${boxClass}">${r.on ? "✓" : ""}</span>
      <span class="${nameClass}">${escAttr(r.name)}</span>
      <span class="${countClass}">${r.count}</span>
    </button>`;
}

function escAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

function renderSidebar() {
  const el = document.querySelector("[data-filter-sidebar]");
  if (!el) return;
  el.innerHTML = `
    <div class="filter-sidebar__head">
      <div class="filter-sidebar__title">Filter <span class="filter-badge" data-filter-badge>${activeCount()}</span></div>
      <button type="button" class="filter-sidebar__clear" data-filter-clear>Clear</button>
    </div>
    ${filterState.map(g => `
      <div class="filter-group">
        <div class="filter-group__label">${g.label}</div>
        ${g.rows.map(r => filterRowMarkup(g.key, r, "sidebar")).join("")}
      </div>`).join("")}
  `;
}

function renderSheet() {
  const el = document.querySelector("[data-filter-sheet-body]");
  if (!el) return;
  el.innerHTML = filterState.map(g => {
    const open = sheetExpanded.has(g.label);
    return `
      <div class="sheet-group">
        <button type="button" class="sheet-group__head" data-sheet-group-toggle="${g.label}">
          <span class="sheet-group__label">${g.label}</span>
          <span class="sheet-group__chevron">${open ? "−" : "+"}</span>
        </button>
        ${open ? g.rows.map(r => filterRowMarkup(g.key, r, "sheet")).join("") : ""}
      </div>`;
  }).join("");

  document.querySelectorAll("[data-filter-sheet-badge]").forEach(b => (b.textContent = activeCount()));
}

function renderChipsAndBadges() {
  const chips = [];
  filterState.forEach(g => g.rows.forEach(r => { if (r.on) chips.push({ group: g.key, name: r.name }); }));

  document.querySelectorAll("[data-chip-row]").forEach(row => {
    row.innerHTML = chips.map(c => `
      <button type="button" class="chip" data-chip-remove data-filter-group="${c.group}" data-filter-name="${escAttr(c.name)}">
        <span>${escAttr(c.name)}</span>
        <span class="chip__x">✕</span>
      </button>`).join("");
  });

  document.querySelectorAll("[data-filter-badge]").forEach(b => (b.textContent = activeCount()));
  document.querySelectorAll("[data-filter-sheet-badge]").forEach(b => (b.textContent = activeCount()));
}

document.addEventListener("click", e => {
  const row = e.target.closest("[data-filter-group][data-filter-name]");
  if (row) {
    toggleFilter(row.getAttribute("data-filter-group"), row.getAttribute("data-filter-name"));
    return;
  }
  if (e.target.closest("[data-filter-clear]") || e.target.closest("[data-sheet-clear]")) {
    clearFilters();
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
      const label = opt.getAttribute("data-sort-option");
      document.querySelectorAll("[data-sort-label]").forEach(l => (l.textContent = `Sort: ${label}`));
      panel.classList.remove("is-open");
      applySort(label);
    });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-sort-toggle]") && !e.target.closest("[data-sort-panel]")) {
      document.querySelectorAll("[data-sort-panel]").forEach(p => p.classList.remove("is-open"));
    }
  });
}

function applySort(label) {
  document.querySelectorAll('[data-product-grid="browse"]').forEach(grid => {
    const cards = Array.from(grid.children);
    if (label === "Price: low to high") {
      cards.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
    } else if (label === "Price: high to low") {
      cards.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
    } else {
      cards.sort((a, b) => a.dataset.originalIndex - b.dataset.originalIndex);
    }
    cards.forEach(c => grid.appendChild(c));
  });
}

function wireLoadMore() {
  document.querySelectorAll("[data-load-more]").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = "That's all for now";
      btn.disabled = true;
      document.querySelectorAll("[data-showing-count]").forEach(el => (el.textContent = "Showing 6 of 6"));
    });
  });
}

// stamp original order so "Featured" can restore it after sorting
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-product-grid="browse"]').forEach(grid => {
    Array.from(grid.children).forEach((c, i) => (c.dataset.originalIndex = i));
  });
});
