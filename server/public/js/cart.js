

// Render cart items from localStorage
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElem = document.getElementById("total-price");
    cartList.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;
    //so the last time i worked on this, was kinda sick, this part is fairly complex becoz of the table integration and everything, get back to it
    cart.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - $${item.price}`;
        cartList.appendChild(listItem);
        totalPrice += item.price;
    });

    totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Clear cart from localStorage and update display
function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// Initial rendering of cart when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

// Example usage: add an item to the cart
addToCart(sampleProduct);
