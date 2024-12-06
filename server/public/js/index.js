let listProductHtml = document.querySelector('.home-row');

let listProducts = [];

const addDataToHTML = () =>{
    listProductHtml.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            console.log(product)
            newProduct.classList.add('col-4');

            // Calculate discount
            const discountPercentage = parseFloat(product.discount) / 100;
            const discountedPrice = product.actual_price * (1 - discountPercentage);

            // Add 'no-discount' class if there's no discount
            const discountClass = discountPercentage === 0 ? "no-discount" : "";

            // Generate HTML for the product, with conditional classes for discount
            newProduct.innerHTML = `
                <div class="product-image ${discountClass}">
                    <span class="discount-tag">${product.discount} off</span> <!-- Discount tag -->
                    <img src="${product.imageVariations[0]}" alt="${product.name}">
                </div>
                <a href=""><h3>${product.name}</h3></a>
                <div class="product-pricing ${discountClass}">
                    <span class="price">R${discountedPrice.toFixed(2)}</span> <!-- Final price -->
                    <span class="actual-price">R${product.actual_price}</span> <!-- Original price -->
                </div>
            `;

            // Add click event to store product data and navigate to product page
            newProduct.addEventListener("click", () => {
                localStorage.setItem('productData', JSON.stringify(product));
                window.location.href = '/product.html';
            });
            
            listProductHtml.appendChild(newProduct);
        })
    }
}


const fetchData = () => {
    //get data from Json
    fetch('js/json/featured.json')
        .then(response => response.json())
        .then(data => {
            listProducts = data;
            addDataToHTML(); // FUNCTION
        })
}
fetchData();