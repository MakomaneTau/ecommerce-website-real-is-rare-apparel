// cart.js
import {saveCart, renderCart,clearCart} from "./functions.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.getElementById("tableBody");


// Render heading and cart contents on page load
window.addEventListener("DOMContentLoaded", () => {

  renderCart(tableBody);
});
console.log(tableBody);
//clearCart();