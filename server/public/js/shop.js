import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelectorAll(".quantity");
cart_quantity[0].innerHTML = getTotalItemsInCart();
cart_quantity[1].innerHTML = getTotalItemsInCart();

const topsRow = document.getElementById('tops');
const pantsRow = document.getElementById('pants');
const accessoriesRow = document.getElementById('accessories');
const setsRow = document.getElementById('sets');

let listItems = [];
const itemRows = document.getElementById("item-rows");

const params = new URLSearchParams(window.location.search);
const itemName = params.get("item"); // Get the 'item' parameter


// Function to add products to the HTML for a specific category
const addProductsToHTML = (productList, rowElement) => {
    if (!rowElement || productList.length === 0) return; // Check if row exists and has products

    let heading = document.querySelector(".heading");
    heading.innerHTML = `${itemName}`;

    rowElement.innerHTML = ''; // Clear previous content
    productList.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('scroll');
        newProduct.classList.add('col-4');

        // Calculate discount
        const discountPercentage = parseFloat(product.discount) / 100;
        const discountedPrice = product.actual_price * (1 - discountPercentage);
        const discountClass = discountPercentage === 0 ? "no-discount" : "";

        // Generate HTML with conditional classes for discount
        newProduct.innerHTML = `
            <div class="product-image ${discountClass}">
                <span class="discount-tag">${product.discount} off</span>
                <img src="${product.imageVariations[0]}" alt="${product.name}">
            </div>
            <a href="#"><h3>${product.name}</h3></a>
            <div class="product-pricing ${discountClass}">
                <span class="price">R${discountedPrice.toFixed(2)}</span>
                <span class="actual-price">R${product.actual_price}</span>
            </div>
        `;

        // Add click event to store product data and navigate to product page
        newProduct.addEventListener("click", () => {
            localStorage.setItem('productData', JSON.stringify(product));
            window.location.href = '/product.html';
        });

        rowElement.appendChild(newProduct); // Append product to row
    });
};



const fetchDataForCategories = () => {
    let path;

    if (itemName === "Accessories") {
        path = 'js/json/accessoriess.json';
    } else if (itemName === "Sets") {
        path = 'js/json/sets.json';
    } else {
        const dir = itemName.toLowerCase();
        if (["t-shirts", "shirts", "hoodies", "jackets"].includes(dir)) {
            path = `js/json/Tops/${dir}.json`;
        } else {
            path = `js/json/Pants/${dir}.json`;
        }
    }

    // Fetch data
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            listItems = data;
            addProductsToHTML(listItems, itemRows);
        })
        .catch(error => console.error(`Error fetching data for ${itemName}:`, error));
};


// Wait for DOM content to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    fetchDataForCategories(); // Fetch data once DOM is ready
});
