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
    const search = cart.find((x) => x.name === item.name &&
                                    x.color === item.color &&
                                    x.size === item.size);
    if (!search) {
        cart.push(item);
    } else {
        search.quantity++;
        search.totalPrice = search.quantity * search.price;
    }
    saveCart(cart);
}

// Clear the cart
export function clearCart(tableBody) {
    localStorage.removeItem('cart');
    if (tableBody) {
        tableBody.innerHTML = '';
        const subtotal = document.getElementById("sub-total");
        const totalCart = document.getElementById("total");
        if (subtotal) subtotal.innerText = `R0.00`;
        if (totalCart) totalCart.innerHTML = `<strong>R0.00</strong>`;
    }
}

// Remove an item from the cart
export function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    const tableBody = document.getElementById("tableBody");
    if (tableBody) renderCart(tableBody);
}

// Render the cart in the table
export function renderCart(tableBody) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!tableBody) {
        console.error("Table body not found!");
        return;
    }

    tableBody.innerHTML = ""; // Clear previous rows
    const subtotal = document.getElementById("sub-total");
    const totalCart = document.getElementById("total");
    let total = 0;

    // Iterate over cart items and create table rows
    cart.forEach((item, index) => {
        const row = document.createElement("tr");

        const c1 = document.createElement("td");
        const c2 = document.createElement("td");
        const c3 = document.createElement("td");
        const c4 = document.createElement("td");
        const c5 = document.createElement("td");
        const c6 = document.createElement("td");
        const c7 = document.createElement("td");

        c1.innerHTML = `<a href="#" class="remove-item" data-index="${index}")"><i class="far fa-times-circle"></i></a>`;
        c2.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">`;
        c3.innerHTML = `${item.name} (${(item.size_name || "N/A").toUpperCase()})`;
        c4.innerHTML = `${item.color_name || "N/A"}`;
        c5.innerText = `R${item.price.toFixed(2)}`;
        c6.innerHTML = `
            <button class="decrement" data-index-number="${index}">-</button>
            <label>${item.quantity}</label>
            <button class="increment" data-index-number="${index}">+</button>`;
        c7.innerText = `R${item.totalPrice.toFixed(2)}`;

        total += item.totalPrice;

        row.append(c1, c2, c3, c4, c5, c6, c7);
        tableBody.appendChild(row);
    });

    subtotal.innerText = `R${total.toFixed(2)}`;
    totalCart.innerHTML = `<strong>R${total.toFixed(2)}</strong>`;

    // Bind increment and decrement buttons
    document.querySelectorAll(".decrement").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.dataset.indexNumber;
            if (index !== undefined) updateQuantity(parseInt(index, 10), "decrement");
        });
    });

    document.querySelectorAll(".increment").forEach((button) => {
        button.addEventListener("click", () => {
            const index = button.dataset.indexNumber;
            if (index !== undefined) updateQuantity(parseInt(index, 10), "increment");
        });
    });

    function updateQuantity(index, action) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (!cart[index]) {
            console.error(`No item found at index ${index}`);
            return;
        }

        if (action === "decrement") {
            if (cart[index].quantity === 1) {
                removeItem(index);
                return;
            } else {
                cart[index].quantity--;
            }
        } else if (action === "increment") {
            cart[index].quantity++;
        }

        cart[index].totalPrice = cart[index].quantity * cart[index].price;
        localStorage.setItem("cart", JSON.stringify(cart));

        renderCart(tableBody);
    }
}
