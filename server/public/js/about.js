import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelector(".quantity");
cart_quantity.innerHTML = getTotalItemsInCart();