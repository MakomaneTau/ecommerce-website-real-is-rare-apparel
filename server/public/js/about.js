import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelectorAll(".quantity");
cart_quantity[0].innerHTML = getTotalItemsInCart();
cart_quantity[1].innerHTML = getTotalItemsInCart();