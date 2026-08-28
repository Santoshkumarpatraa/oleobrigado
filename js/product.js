// Product detail page: quantity stepper + add-to-cart (main CTA and the pinned
// mobile buy bar both add the selected quantity — not a flat 1, unlike a card's
// quick-add).

let qty = 2; // matches the design's default stepper value

document.addEventListener("DOMContentLoaded", () => {
  renderQty();
});

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
