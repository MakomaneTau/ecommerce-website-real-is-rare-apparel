import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelectorAll(".quantity");
cart_quantity[0].innerHTML = getTotalItemsInCart();
cart_quantity[1].innerHTML = getTotalItemsInCart();

const topsRow = document.getElementById('tops');
const pantsRow = document.getElementById('pants');
const accessoriesRow = document.getElementById('accessories');
const setsRow = document.getElementById('sets');

// Lists to hold products for each category
let listTops = [];
let listPants = [];
let listAccessories = [];
let listSets = [];

// Function to add products to the HTML for a specific category
const addProductsToHTML = (productList, rowElement) => {
    if (!rowElement || productList.length === 0) return; // Check if row exists and has products

    rowElement.innerHTML = ''; // Clear previous content
    productList.forEach(product => {
        let newProduct = document.createElement('div');
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

// Function to fetch JSON data for all categories
const fetchDataForCategories = () => {
    // Fetch tops data
    fetch('js/json/tops.json')
        .then(response => response.json())
        .then(data => {
            listTops = data;
            addProductsToHTML(listTops, topsRow); // Call function to render tops
        })
        .catch(error => console.error('Error fetching tops data:', error));

    // Fetch pants data
    fetch('js/json/pants.json')
        .then(response => response.json())
        .then(data => {
            listPants = data;
            addProductsToHTML(listPants, pantsRow); // Call function to render pants
        })
        .catch(error => console.error('Error fetching pants data:', error));

    // Fetch accessories data
    fetch('js/json/accessories.json')
        .then(response => response.json())
        .then(data => {
            listAccessories = data;
            addProductsToHTML(listAccessories, accessoriesRow); // Call function to render accessories
        })
        .catch(error => console.error('Error fetching accessories data:', error));

    // Fetch sets data
    fetch('js/json/sets.json')
        .then(response => response.json())
        .then(data => {
            listSets = data;
            addProductsToHTML(listSets, setsRow); // Call function to render sets
        })
        .catch(error => console.error('Error fetching sets data:', error));
};

// Wait for DOM content to load before running the script
document.addEventListener("DOMContentLoaded", () => {
    fetchDataForCategories(); // Fetch data once DOM is ready
});
