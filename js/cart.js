// Minimal client-side cart state — no backend. The live oleobrigado.com site has
// no cart; per the design notes, the marketplace/cart/case-pricing premise is a
// proposal this design layer adds on top, so it only needs to behave consistently
// in the browser (shared across pages via localStorage).

const CART_KEY = "oo-cart-count";

function getCartCount() {
  const raw = window.localStorage.getItem(CART_KEY);
  const n = raw ? parseInt(raw, 10) : 0;
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function setCartCount(n) {
  window.localStorage.setItem(CART_KEY, String(Math.max(0, n)));
  updateCartBadges();
}

function addToCart(qty) {
  setCartCount(getCartCount() + (qty || 1));
}

function updateCartBadges() {
  const count = getCartCount();
  document.querySelectorAll("[data-cart-badge]").forEach(el => {
    el.textContent = `CART (${count})`;
  });
}
