const slides = document.querySelectorAll(".slides img");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let slideIndex = 0;
let interValid = null;

document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){

    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        interValid = setInterval(nextSlide,5000);
    }

}

function showSlide(index){

    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");

    });
    slides[slideIndex].classList.add("displaySlide");
}

prev.addEventListener("click", prevSlide);
next.addEventListener("click",nextSlide);

function resetInterval() {
    clearInterval(interValid);
    interValid = setInterval(nextSlide, 5000);
}

function prevSlide() {
    slideIndex--;
    showSlide(slideIndex);
    resetInterval();
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
    resetInterval();
}