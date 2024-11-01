/*
//let topsRow = document.querySelector('.row');
//let topsRow = document.querySelector('#tops + .row');
//let topsRow = document.querySelector('#tops + .row');
const topsRow = document.getElementById('tops');
const pantsRow = document.getElementById('pants');
const accessoriesRow = document.getElementById('accessories');
const setsRow = document.getElementById('sets');


let listTops = [];
let listPants =[];
let listAccessories = [];
let listSets = [];


const addTopsToHTML = () =>{
    //topsRow.innerHTML = '';
    if(listTops.length > 0){
        listTops.forEach(product =>{
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
            
            newProduct.addEventListener("click",() =>{
                // Store JSON object as string in localStorage
                localStorage.setItem('productData', JSON.stringify(product));

                // Redirect to another page (for example: product.html)
                window.location.href = '/product.html'; // Change to appropriate page
                console.log(`Product clicked: ${product.name}`);
            })



            
            topsRow.appendChild(newProduct);
        })
    }
}


const addPantsToHTML = () =>{
    pantsRow.innerHTML = '';
    if(listPants.length > 0){
        listPants.forEach(product =>{
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

            newProduct.addEventListener("click",() =>{
                // Store JSON object as string in localStorage
                localStorage.setItem('productData', JSON.stringify(product));

                // Redirect to another page (for example: product.html)
                window.location.href = '/product.html'; // Change to appropriate page
                console.log(`Product clicked: ${product.name}`);
            })
            
            pantsRow.appendChild(newProduct);
        })
    }
}

const addAccessoriesToHTML = () =>{
    accessoriesRow.innerHTML = '';
    if(listAccessories.length > 0){
        listAccessories.forEach(product =>{
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

            newProduct.addEventListener("click",() =>{
                // Store JSON object as string in localStorage
                localStorage.setItem('productData', JSON.stringify(product));

                // Redirect to another page (for example: product.html)
                window.location.href = '/product.html'; // Change to appropriate page
                console.log(`Product clicked: ${product.name}`);
            })

            accessoriesRow.appendChild(newProduct);
        })
    }
}

const addSetsToHTML = () =>{
    setsRow.innerHTML = '';
    if(listSets.length > 0){
        listSets.forEach(product =>{
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

            newProduct.addEventListener("click",() =>{
                // Store JSON object as string in localStorage
                localStorage.setItem('productData', JSON.stringify(product));

                // Redirect to another page (for example: product.html)
                window.location.href = '/product.html'; // Change to appropriate page
                console.log(`Product clicked: ${product.name}`);
            })
            
            setsRow.appendChild(newProduct);
        })
    }
}


const fetchDataTops = () => {
    //get data from Json
    fetch('js/json/tops.json')
        .then(response => response.json())
        .then(data => {
            listTops = data;
            addTopsToHTML(); // FUNCTION
        })

    fetch('js/json/pants.json')
        .then(response => response.json())
        .then(data => {
            listPants = data;
            addPantsToHTML();
        })

    fetch('js/json/accessories.json')
        .then(response => response.json())
        .then(data => {
            listAccessories = data;
            addAccessoriesToHTML();
        })
    
    fetch('js/json/sets.json')
        .then(response => response.json())
        .then(data => {
            listSets = data;
            addSetsToHTML();
        })

}
fetchDataTops();

*/
// Select product category rows
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
