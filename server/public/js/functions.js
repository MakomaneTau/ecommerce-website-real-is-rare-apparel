let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

// Save the cart to localStorage
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add an item to the cart
export function addItemToCart(item) {
    
    const search = cart.find((x) => x.name === item.name&&
                                    x.color === item.color&&
                                    x.size === item.size);
    if(!search){
        cart.push(item);
    }
    else{
        search.quantity++;
        search.totalPrice = search.quantity * search.price;
    }

    
    saveCart(cart);
}

// Clear the cart
export function clearCart() {
    localStorage.removeItem('cart');
}

//Still deciding
export function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); // Remove item by index
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
    renderCart(); // Re-render cart
}

// Function to render(display) cart items on the cart page

//this one will only be called in Cart.html
export function renderCart(tableBody) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //const tableBody = document.getElementById("tableBody");

    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear previous rows

    // Iterate over cart items and create table rows
    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const c1 = document.createElement("td"); // Remove button
        const c2 = document.createElement("td"); // Product image
        const c3 = document.createElement("td"); // Product name
        const c4 = document.createElement("td"); // Unit price
        const c5 = document.createElement("td");
        const c6 = document.createElement("td");
        const c7 = document.createElement("td"); // Decrement Button Quantity input Increment Button
        const c8 = document.createElement("td"); // Total price

        c1.innerHTML = `<a href="#" onclick="removeItem(${index})"><i class="far fa-times-circle"></i></a>`;
        c2.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">`;
        c3.innerText = item.name;
        c4.innerText = `$${item.price.toFixed(2)}`;
        
        c6.innerHTML = ``;
        c7.innerHTML = ``;
        c5.innerHTML = `<button class="decrement">-</button><label>1</label><button class="increment">+<button>`;
        c8.innerText = `$${item.totalPrice.toFixed(2)}`;

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);
        row.appendChild(c6);
        row.appendChild(c7);
        row.appendChild(c8);

        tableBody.appendChild(row);
    });
}

