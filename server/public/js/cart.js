import { saveCart, renderCart, clearCart, getTotalItemsInCart } from "./functions.js";

let cart_quantity = document.querySelectorAll(".quantity");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.getElementById("tableBody");
const clear = document.querySelector(".clear");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartContent = document.querySelector(".cart");
const subtotalSection = document.querySelector(".subtotal");

// Function to toggle visibility of cart content
export function toggleCartVisibility(cart) {
  if (cart.length === 0) {
    if (cartContent) cartContent.classList.add("hidden");
    if (subtotalSection) subtotalSection.classList.add("hidden");
    if (clear) clear.classList.add("hidden");
    if (emptyCartMessage) emptyCartMessage.classList.remove("hidden"); // Show empty cart message if present
  } 
  else {
    if (cartContent) cartContent.classList.remove("hidden");
    if (subtotalSection) subtotalSection.classList.remove("hidden");
    if (clear) clear.classList.remove("hidden");
    if (emptyCartMessage) emptyCartMessage.classList.add("hidden"); // Hide empty cart message
  }
}

if (clear) {
  clear.addEventListener("click", () => {
    clearCart(tableBody);
    if (cart_quantity) {
      cart_quantity[0].innerHTML = getTotalItemsInCart();
      cart_quantity[1].innerHTML = getTotalItemsInCart();
    }
    toggleCartVisibility([]);
  });
} else {
  console.error("Element '.clear' not found.");
}

// Render heading and cart contents on page load
window.addEventListener("DOMContentLoaded", () => {
  if (tableBody && cart_quantity) {
    renderCart(tableBody, cart_quantity);
  } else {
    console.error("Missing elements for rendering cart.");
  }
  toggleCartVisibility(cart);
});
