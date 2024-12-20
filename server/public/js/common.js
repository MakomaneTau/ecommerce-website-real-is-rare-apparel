import { getTotalItemsInCart } from "./functions.js";
let cart_quantity = document.querySelectorAll(".quantity");
cart_quantity[0].innerHTML = getTotalItemsInCart();
cart_quantity[1].innerHTML = getTotalItemsInCart();

////////////////////////////////////////////////////////////////////////////////////////

const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const close = document.getElementById("close");

if(bar){
    bar.addEventListener("click", () =>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener("click", () =>{
        nav.classList.remove('active');
    })
}

document.addEventListener("click", (event) => {
    if (nav.classList.contains('active') && !nav.contains(event.target) && !bar.contains(event.target)) {
        nav.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all dropdown toggle elements
    const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

    // Add click event listener to each toggle
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Get the next sibling dropdown menu
            const dropdownMenu = toggle.nextElementSibling;

            // Toggle the clicked dropdown menu
            dropdownMenu.classList.toggle("active");
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (event) => {
        if (!event.target.closest("#navbar")) {
            document.querySelectorAll(".dropdown_menu, .dropdown_menu-1").forEach(menu => {
                menu.classList.remove("active");
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select all dropdown menu items
    const dropdownItems = document.querySelectorAll(".dropdown_menu ul li a, .dropdown_menu-1 ul li a");

    // Add click event listener to each item
    dropdownItems.forEach(item => {
        item.addEventListener("click", (event) => {
            // Check if the clicked item is "Accessories" (or any other item you want to exclude)
            if (item.textContent.trim() === "Accessories") {
                event.preventDefault(); // Prevent the action for "Accessories"
                return; // Exit the function without doing anything
            }

            // Get the text content of the clicked item
            const itemName = item.textContent.trim();

            // Redirect to another page with the item name as a query parameter
            window.location.href = `shop.html?item=${encodeURIComponent(itemName)}`;
        });
    });
});
