import { addItemToCart, getTotalItemsInCart } from './functions.js';

let cart_quantity = document.querySelector(".quantity");
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
    product.imageVariations.forEach((image, index) => {
        let newImage = document.createElement('img');
        newImage.classList.add('img');
        if (index === 0) newImage.classList.add('active'); // Mark the first image as active
        newImage.src = image;
        newImage.alt = `Product variation ${index + 1}`;
        newproductImages.appendChild(newImage);

        // Add event listener to change the slider background on click
        newImage.addEventListener('click', () => {
            // Remove active class from all images
            document.querySelectorAll('.product-images img').forEach(img => img.classList.remove('active'));
            // Add active class to clicked image
            newImage.classList.add('active');
            // Update slider background
            productImageSlide.style.backgroundImage = `url('${image}')`;
        });
    });
}

// Calculate the discount
const discountPercentage = product && product.discount ? parseFloat(product.discount) / 100 : 0;
const discountedPrice = product && product.actual_price ? product.actual_price * (1 - discountPercentage) : 0;

if (product && product.sizeVariations.length > 0) {
    product.sizeVariations.forEach((size, index) => {
        let newSize = document.createElement('input');
        newSize.type = 'radio';
        newSize.name = 'size';
        newSize.value = size;
        newSize.id = `${size}-size`;
        newSize.hidden = true;

        if (index === 0) {
            newSize.checked = true; // Check the first size by default
        }

        let newLabel = document.createElement('label');
        newLabel.htmlFor = `${size}-size`;
        newLabel.classList.add('size-radio-btn');
        if (index === 0) {
            newLabel.classList.add('check'); // Highlight the first size button
        }
        newLabel.innerText = size.charAt(0).toUpperCase() + size.slice(1);

        newDetail.appendChild(newSize);
        newDetail.appendChild(newLabel);
    });
}

newDetail.innerHTML += `
    <p class="product-sub-heading">Select Color</p>
`;

// Add color selection options
if (product && product.colorVariations.length > 0) {
    product.colorVariations.forEach((color, index) => {
        let newColor = document.createElement('input');
        newColor.type = 'radio';
        newColor.name = 'color';
        newColor.value = color;
        newColor.id = `${color}-color`;
        newColor.hidden = true;

        if (index === 0) {
            newColor.checked = true; // Check the first color by default
        }

        let newLabel = document.createElement('label');
        newLabel.htmlFor = `${color}-color`;
        newLabel.classList.add('color-radio-btn');
        if (index === 0) {
            newLabel.classList.add('check'); // Highlight the first color button
        }
        newLabel.innerText = color.charAt(0).toUpperCase();
        newLabel.style.borderColor = `${color}`;
        newLabel.style.background = index === 0 ? color : 'none'; // Default the first color's background

        newDetail.appendChild(newColor);
        newDetail.appendChild(newLabel);
    });
}

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
    cart_quantity.innerHTML = getTotalItemsInCart();
}
