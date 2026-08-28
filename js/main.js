// Shared interactivity: header utility dropdowns, mobile drawer + its accordions,
// cart badge wiring. Runs on every page. Uses event delegation because the header/
// footer markup is injected by components.js after this file loads.

document.addEventListener("DOMContentLoaded", () => {
  mountSiteChrome();
  updateCartBadges();
  openDrawerAccordion("Press"); // matches the design's default drawerOpen state
});

function closeAllUtilDropdowns(exceptLabel) {
  document.querySelectorAll("[data-util-dropdown]").forEach(dd => {
    if (dd.getAttribute("data-util-dropdown") !== exceptLabel) dd.classList.remove("is-open");
  });
  document.querySelectorAll("[data-util-caret]").forEach(c => {
    if (c.getAttribute("data-util-caret") !== exceptLabel) c.textContent = "▾";
  });
}

function toggleUtilDropdown(label) {
  const dd = document.querySelector(`[data-util-dropdown="${cssEscape(label)}"]`);
  if (!dd) return;
  const willOpen = !dd.classList.contains("is-open");
  closeAllUtilDropdowns(willOpen ? label : null);
  dd.classList.toggle("is-open", willOpen);
  const caret = document.querySelector(`[data-util-caret="${cssEscape(label)}"]`);
  if (caret) caret.textContent = willOpen ? "▴" : "▾";
}

function openDrawerAccordion(label) {
  document.querySelectorAll("[data-drawer-sub]").forEach(sub => {
    const open = sub.getAttribute("data-drawer-sub") === label;
    sub.hidden = !open;
  });
  document.querySelectorAll("[data-drawer-sign]").forEach(sign => {
    sign.textContent = sign.getAttribute("data-drawer-sign") === label ? "−" : "+";
  });
}

function openDrawer() {
  const drawer = document.querySelector("[data-drawer]");
  const backdrop = document.querySelector("[data-drawer-backdrop]");
  if (drawer) drawer.classList.add("is-open");
  if (backdrop) backdrop.classList.add("is-open");
}

function closeDrawer() {
  const drawer = document.querySelector("[data-drawer]");
  const backdrop = document.querySelector("[data-drawer-backdrop]");
  if (drawer) drawer.classList.remove("is-open");
  if (backdrop) backdrop.classList.remove("is-open");
}

function cssEscape(str) {
  return window.CSS && CSS.escape ? CSS.escape(str) : str.replace(/["\\]/g, "\\$&");
}

document.addEventListener("click", e => {
  const utilToggle = e.target.closest("[data-util-toggle]");
  if (utilToggle) {
    e.preventDefault();
    toggleUtilDropdown(utilToggle.getAttribute("data-util-toggle"));
    return;
  }

  const drawerToggle = e.target.closest("[data-drawer-toggle]");
  if (drawerToggle) {
    e.preventDefault();
    const label = drawerToggle.getAttribute("data-drawer-toggle");
    const sub = document.querySelector(`[data-drawer-sub="${cssEscape(label)}"]`);
    const isOpen = sub && !sub.hidden;
    openDrawerAccordion(isOpen ? null : label);
    return;
  }

  if (e.target.closest("[data-drawer-open]")) {
    openDrawer();
    return;
  }
  if (e.target.closest("[data-drawer-close]") || e.target.closest("[data-drawer-backdrop]")) {
    closeDrawer();
    return;
  }

  const addBtn = e.target.closest("[data-add-to-cart]");
  if (addBtn) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(1);
    flashAdded(addBtn);
    return;
  }

  if (!e.target.closest("[data-util-toggle]") && !e.target.closest("[data-util-dropdown]")) {
    closeAllUtilDropdowns(null);
  }
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAllUtilDropdowns(null);
    closeDrawer();
  }
});

function flashAdded(btn) {
  const original = btn.textContent;
  btn.textContent = "Added ✓";
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 900);
}
