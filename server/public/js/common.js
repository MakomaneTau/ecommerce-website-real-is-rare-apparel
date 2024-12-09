import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelector(".quantity");
cart_quantity.innerHTML = getTotalItemsInCart();

let table = document.getElementById("tableBody");
    if (!table) {
        console.error("Table body not found");
        
    }

const newproductImages = document.querySelector(".product-images");
const productImageSlide = document.querySelector(".image-slider"); // Select image slider element
const productDetails = document.querySelector(".product-details");
const details = document.querySelector('.details');

// Check if productData is stored in localStorage
const productData = localStorage.getItem('productData');
const product = productData ? JSON.parse(productData) : null;
console.log(product);

if (product && product.imageVariations.length > 0) {
    // Set initial slider background image
    productImageSlide.style.backgroundImage = `url('${product.imageVariations[0]}')`;

    // Add product images to gallery
    product.imageVariations.forEach(image => {
        let newImage = document.createElement('img');
        newImage.classList.add('img');
        newImage.src = image;
        newproductImages.appendChild(newImage);
    });
}

// Calculate the discount
const discountPercentage = product && product.discount ? parseFloat(product.discount) / 100 : 0;
const discountedPrice = product && product.actual_price ? product.actual_price * (1 - discountPercentage) : 0;

// Create the product details section
let newDetail = document.createElement('div');
newDetail.classList.add('details');
newDetail.innerHTML = `
    <h2 class="product-brand">${product.name}</h2>
    <p class="product-short-des">${product.shortDescription}</p>
    <span class="product-price">R${discountedPrice.toFixed(2)}</span>
    ${discountPercentage > 0 ? `<span class="product-actual-price">R${product.actual_price}</span>
    <span class="product-discount">( ${product.discount} off )</span>` : ""}
    <p class="product-sub-heading">Select size</p>

    <input type="radio" name="size" value="s" checked hidden id="s-size">
    <label for="s-size" class="size-radio-btn check">S</label>
    <input type="radio" name="size" value="m" hidden id="m-size">
    <label for="m-size" class="size-radio-btn">M</label>
    <input type="radio" name="size" value="L" hidden id="l-size">
    <label for="l-size" class="size-radio-btn">L</label>
    <input type="radio" name="size" value="xl" hidden id="xl-size">
    <label for="xl-size" class="size-radio-btn">XL</label>

    <p class="product-sub-heading">Select Color</p>
`;

// Add color selection options
if (product && product.colorVariations.length > 0) {
    product.colorVariations.forEach(color => {
        let newColor = document.createElement('input');
        newColor.type = 'radio';
        newColor.name = 'color';
        newColor.value = color;
        newColor.id = `${color}-color`;
        newColor.hidden = true;

        let newLabel = document.createElement('label');
        newLabel.htmlFor = `${color}-color`;
        newLabel.classList.add('color-radio-btn');
        newLabel.innerText = color.charAt(0).toUpperCase();
        newLabel.style.borderColor = `${color}`;

        newDetail.appendChild(newColor);
        newDetail.appendChild(newLabel);
    });
}

newDetail.innerHTML += `
    <br>
    <button class="btn">Add to cart</button>
`;

// Append product details to the details section
details.appendChild(newDetail);

// Image slider functionality
let activeImageSlide = 0;
newproductImages.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        productImageSlide.style.backgroundImage = `url('${event.target.src}')`;
    }
});

// Toggle size buttons
const sizeBtns = document.querySelectorAll('.size-radio-btn');
let checkedBtn = 0;
sizeBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        sizeBtns[checkedBtn].classList.remove('check');
        item.classList.add('check');
        checkedBtn = i;
    });
});

// Toggle color buttons
const colorBtns = document.querySelectorAll('.color-radio-btn');
let checkedColorBtn = 0;
colorBtns.forEach((item, i) => {
    item.addEventListener('click', () => {
        colorBtns[checkedColorBtn].style.removeProperty('background');
        colorBtns[checkedColorBtn].classList.remove('check');
        item.classList.add('check');
        item.style.background = `${product.colorVariations[i]}`;
        checkedColorBtn = i;
    });
});

// Add event listener for 'Add to Cart' button
newDetail.querySelector('.btn').addEventListener('click', () => addToCart(product));
// Function to add product to cart
function addToCart(product) {

    let row = document.createElement("tr");

    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    let c5 = document.createElement("td");
    let c6 = document.createElement("td");

    c1.innerHTML = `<a href="#"><i class="far fa-times-circle"></i></a>`;
    c2.innerHTML = `<img src="${product.image}" alt="${product.name}">`;
    c3.innerHTML  = `${product.name}`;
    c4.innerText =  `${product.actual_price}`; //Price has to based on number of products selected;
    c5.innerHTML = `<input type="number" value = "1">`;
    c6.innerHTML = `${product.actual_price}`;

    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);
    console(row);
    tableBody.appendChild(row);
    

    console.log("added");

    if (!product) return; // Guard clause if product is null
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// Function to render cart items from localStorage
function renderCart() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElem = document.getElementById("total-price");
    if (!cartList || !totalPriceElem) return; // Guard clause if cart elements are not found

    cartList.innerHTML = "";
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    cart.forEach((item) => {
        let listItem = document.createElement("li");
        listItem.textContent = `${item.name} - R${item.actual_price}`;
        cartList.appendChild(listItem);
        totalPrice += parseFloat(item.actual_price);
    });

    totalPriceElem.textContent = `Total: R${totalPrice.toFixed(2)}`;
}

// Clear cart and update display
function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
}

// Initial rendering of cart when the page loads
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});
