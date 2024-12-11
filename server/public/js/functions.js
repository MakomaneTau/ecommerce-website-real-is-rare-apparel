export function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

// Save the cart to localStorage
export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function getTotalItemsInCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    -

    // Log the cart contents for debugging
    console.log('Cart:', cart);
    console.log('Cart:', cart.length);

    return cart.reduce((total, item) => {
        // Ensure each item has a quantity property and it's a valid number
        if (item && typeof item.quantity === 'number') {
            return total + item.quantity;
        }
        return total; // Skip items with invalid or missing quantity
    }, 0);
}

// Add an item to the cart
export function addItemToCart(item) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    renderCart(tableBody);
}

// Remove an item from the cart
export function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove item by index
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart
    if (document.getElementById('tableBody')) {
        let tableBody = document.getElementById('tableBody');
        renderCart(tableBody);  // Re-render cart
    }
}

// Render the cart in the table (called in Cart.html)
export function renderCart(tableBody, cart_quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!tableBody) {
        console.error('Table body not found!');
        return;
    }

    tableBody.innerHTML = ''; // Clear previous rows

    // Recalculate and update the cart total
    let total = 0;
    const newTotal = calculateCartTotal();
    const subtotal = document.getElementById('sub-total');
    const totalCart = document.getElementById('total');

    // Iterate over cart items and create table rows
    cart.forEach((item, index) => {
        const row = document.createElement('tr');

        const c1 = document.createElement('td'); // Remove button
        const c2 = document.createElement('td'); // Product image
        const c3 = document.createElement('td'); // Product name
        const c4 = document.createElement('td'); // Unit price
        const c5 = document.createElement('td');
        const c6 = document.createElement('td'); // Decrement Button Quantity input Increment Button
        const c7 = document.createElement('td'); // Total price

        c1.innerHTML = `<a href="#" class="remove-item" data-index="${index}"><i class="far fa-times-circle"></i></a>`;
        c2.innerHTML = `<img src="${item.image}" alt="${item.name}" style="width: 50px; height: auto;">`;
        let size = item.size_name;
        c3.innerHTML = `${item.name} (${size.toUpperCase()})`;
        c4.innerHTML = `${item.color_name}`;
        c5.innerText = `R${item.price}`;
        
        c6.innerHTML = `
            <button class="decrement" data-index-number="${index}">-</button>
            <label>${item.quantity}</label>
            <button class="increment" data-index-number="${index}">+</button>`;
        
        c7.innerText = `R${item.totalPrice}`;
        
        total += parseFloat(item.totalPrice);

        row.appendChild(c1);
        row.appendChild(c2);
        row.appendChild(c3);
        row.appendChild(c4);
        row.appendChild(c5);
        row.appendChild(c6);
        row.appendChild(c7);

        tableBody.appendChild(row);
    });

    let decrementButtons = document.querySelectorAll('.decrement');
    let incrementButtons = document.querySelectorAll('.increment');
    let cart_quantity = document.querySelectorAll(".quantity");

    decrementButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = button.dataset.indexNumber;
            if (index === undefined) {
                console.error('data-index not found for decrement button', button);
                return;
            }
            updateQuantity(parseInt(index, 10), 'decrement');
        });
    });

    incrementButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = button.dataset.indexNumber;
            if (index === undefined) {
                console.error('data-index not found for increment button', button);
                return;
            }
            updateQuantity(parseInt(index, 10), 'increment');
        });
    });

    subtotal.innerText = `R${total.toFixed(2)}`;
    totalCart.innerHTML = `<strong>R${total.toFixed(2)}</strong>`;

    let removeButton = document.querySelectorAll('.remove-item');
    removeButton.forEach((button) => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            removeItem(parseInt(index, 10));
        });
    });

    function updateQuantity(index, action) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Ensure the item exists in the cart
        if (!cart[index]) {
            console.error(`No item found at index ${index}`);
            return;
        }
    
        if (action === 'decrement') {
            // Decrease quantity or remove the item if quantity reaches 0
            if (cart[index].quantity === 1) {
                // Remove the item if quantity is 1
                removeItem(index);
                return; // Exit the function to prevent further changes
            } else {
                cart[index].quantity--;
            }
        } else if (action === 'increment') {
            // Increase quantity
            cart[index].quantity++;
        }
    
        // Recalculate total price for the item
        cart[index].totalPrice = cart[index].quantity * cart[index].price;
    
        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    
        // Update the cart total and display
        const total = calculateCartTotal();
        const subtotal = document.getElementById('sub-total');
        const totalCart = document.getElementById('total');
    
        if (subtotal) {
            subtotal.innerText = `R${total.toFixed(2)}`;
        }
    
        if (totalCart) {
            totalCart.innerHTML = `<strong>R${total.toFixed(2)}</strong>`;
        }
    
        // Update the cart quantity display (refreshed from the new cart data)

        
            cart_quantity[0].innerHTML = getTotalItemsInCart();  // Update first quantity
            cart_quantity[1].innerHTML = getTotalItemsInCart();  // Update second quantity

    
        // Re-render the cart to reflect changes in the table
        renderCart(document.getElementById('tableBody'), document.getElementById('cart_quantity'));
    }
        

    // Function to calculate the total cart value
    function calculateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart.reduce((total, item) => total + (item.quantity * item.price), 0);
    }
}
