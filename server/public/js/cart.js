// cart.js
import {renderCart} from "./functions.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const tableBody = document.getElementById("tableBody");

//creat button to clear cart and eventListener

// Clear the cart
/*export function clearCart() {
    localStorage.removeItem('cart');
}
*/

function updateQuantity(index, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    quantity = parseInt(quantity);

    if (quantity < 1) quantity = 1; // Ensure quantity is at least 1
    cart[index].quantity = quantity;
    cart[index].totalPrice = cart[index].quantity * cart[index].price;

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    renderCart(tableBody); // Re-render cart
}


// Render heading and cart contents on page load
window.addEventListener("DOMContentLoaded", () => {
  renderCart(tableBody);
});