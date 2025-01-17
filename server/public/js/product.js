let cart = JSON.parse(localStorage.getItem('cart')) || [];
import { addItemToCart, getTotalItemsInCart } from './functions.js';

const newproductImages = document.querySelector(".product-images");
const productImageSlide = document.querySelector(".image-slider"); // Select image slider element
const productDetails = document.querySelector(".product-details");
const details = document.querySelector('.details');
let cart_quantity = document.querySelectorAll(".quantity");

// Check if productData is stored in localStorage
const productData = localStorage.getItem('productData');
const product = productData ? JSON.parse(productData) : null;

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
`;

if (product && product.sizeVariations.length > 0) {
    product.sizeVariations.forEach(size => {
        let newSize = document.createElement('input');
        newSize.type = 'radio';
        newSize.name = 'size';
        newSize.value = size;
        newSize.id = `${size}-size`;
        newSize.hidden = true;

        let newLabel = document.createElement('label');
        newLabel.htmlFor = `${size}-size`;
        newLabel.classList.add('size-radio-btn');
        /*if (newSize.value === product.sizeVariations[0]) {
            newLabel.checked = true; // Default to the first size
        }*/
        newLabel.innerText = size.charAt(0).toUpperCase() + size.slice(1);

        //newLabel.style.borderColor = `${color}`;

        newDetail.appendChild(newSize);
        newDetail.appendChild(newLabel);
    });
}

newDetail.innerHTML += `
    <p class="product-sub-heading">Select Color</p>
`

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


function addToCart(product) {
    if (!product || !product.name || !product.actual_price) {
        console.error("Invalid product object");
        return;
    }

    // Get selected size and color
    const selectedSize = document.querySelector('input[name="size"]:checked');
    const selectedColor = document.querySelector('input[name="color"]:checked');

    if (!selectedSize || !selectedColor) {
        alert("Please select both a size and a color.");
        return;
    }

    // Calculate the final price based on the discount
    const discountPercentage = product.discount ? parseFloat(product.discount) / 100 : 0;
    const finalPrice = product.actual_price * (1 - discountPercentage);

    const newItem = {
        name: product.name,
        image: product.imageVariations[0], // Main product image
        size: checkedBtn,
        size_name: product.sizeVariations[checkedBtn],
        color: checkedColorBtn,
        color_name: product.colorVariations[checkedColorBtn],
        price: finalPrice.toFixed(2), // Discounted price (if any)
        quantity: 1, // Initial quantity
        totalPrice: finalPrice.toFixed(2), // Total price for this item
    };

    addItemToCart(newItem);
    cart_quantity[0].innerHTML = getTotalItemsInCart();
    cart_quantity[1].innerHTML = getTotalItemsInCart();
}
