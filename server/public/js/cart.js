// cart.js
import {saveCart, renderCart,clearCart,getTotalItemsInCart} from "./functions.js";

let cart_quantity = document.querySelector(".quantity");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.getElementById("tableBody");
const clear = document.querySelector(".clear");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartContent = document.querySelector(".cart");
const subtotalSection = document.querySelector(".subtotal");

// Function to toggle visibility of cart content
function toggleCartVisibility(cart) {
  if (cart.length === 0) {
      cartContent.classList.add("hidden");
      subtotalSection.classList.add("hidden");
      clear.classList.add("hidden");
      if (emptyCartMessage) emptyCartMessage.classList.remove("hidden"); // Show empty cart message if present
  } else {
      cartContent.classList.remove("hidden");
      subtotalSection.classList.remove("hidden");
      if (emptyCartMessage) emptyCartMessage.classList.add("hidden"); // Hide empty cart message
  }
}

clear.addEventListener("click", () => {

  clearCart(tableBody);
  cart_quantity.innerHTML = getTotalItemsInCart();
  toggleCartVisibility([]);
});


/*
// Get the current pathname
const path = window.location.pathname;

// Extract the file name (last part of the path)
const pageName = path.substring(path.lastIndexOf('/') + 1);

console.log("Page Name:", pageName);
*/

// Render heading and cart contents on page load
window.addEventListener("DOMContentLoaded", () => {

  renderCart(tableBody,cart_quantity);
  toggleCartVisibility(cart);
});
