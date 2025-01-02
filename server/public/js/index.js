import { getTotalItemsInCart } from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
    let listProductHtml = document.querySelector('.home-row');
    if (!listProductHtml) {
        console.error("Element '.home-row' not found.");
        return; // Exit if the element doesn't exist
    }

    
    let cart_quantity = document.querySelectorAll(".quantity");
    if (cart_quantity) {
        cart_quantity[0].innerHTML = getTotalItemsInCart();
        cart_quantity[1].innerHTML = getTotalItemsInCart();
    } else {
        console.error("Cart quantity element not found.");
    }

    let listProducts = [];

    const addDataToHTML = () => {
        listProductHtml.innerHTML = '';
        if (listProducts.length > 0) {
            listProducts.forEach(product => {
                let newProduct = document.createElement('div');
                console.log(product);
                newProduct.classList.add('col-4','hidden');

                const discountPercentage = parseFloat(product.discount) / 100;
                const discountedPrice = product.actual_price * (1 - discountPercentage);
                const discountClass = discountPercentage === 0 ? "no-discount" : "";

                newProduct.innerHTML = `
                    <div class="product-image ${discountClass} scroll">
                        <span class="discount-tag">${product.discount} off</span>
                        <img src="${product.imageVariations[0]}" alt="${product.name}">
                    </div>
                    <a href=""><h3>${product.name}</h3></a>
                    <div class="product-pricing ${discountClass}">
                        <span class="price">R${discountedPrice.toFixed(2)}</span>
                        <span class="actual-price">R${product.actual_price}</span>
                    </div>
                `;

                newProduct.addEventListener("click", () => {
                    localStorage.setItem('productData', JSON.stringify(product));
                    window.location.href = '/product.html';
                });

                listProductHtml.appendChild(newProduct);
            });
        }
    };

    const fetchData = () => {
        fetch('js/json/featured.json')
            .then(response => response.json())
            .then(data => {
                listProducts = data;
                addDataToHTML();
            })
            .catch(error => console.error("Error fetching data:", error));
    };

    fetchData();

    let exclusives = document.getElementById("exclusive");
    exclusives.addEventListener("click", ()=>{
        window.location.href= "/exclusive.html";
    });
});
