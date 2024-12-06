// cart.js
import {saveCart, renderCart,clearCart} from "./functions.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.getElementById("tableBody");

// Get the current pathname
const path = window.location.pathname;

// Extract the file name (last part of the path)
const pageName = path.substring(path.lastIndexOf('/') + 1);

console.log("Page Name:", pageName);


// Render heading and cart contents on page load
window.addEventListener("DOMContentLoaded", () => {

  renderCart(tableBody);
});
console.log(tableBody);
//clearCart();