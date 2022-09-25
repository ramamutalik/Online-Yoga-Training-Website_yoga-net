let menuOpenBtn = document.querySelector(".navbar .fabars");
let closeOpenBtn = document.querySelector(".nav-links .faxmark");
let navLinks = document.querySelector(".nav-links");

menuOpenBtn.addEventListener("click", ()=>{
       navLinks.style.left= "0";
});


closeOpenBtn.addEventListener("click", ()=>{
    navLinks.style.left= "-100%";
});

//sidebar dropdown menu open and close js code

let tutorArrow = document.querySelector(".tutor-arrow");
tutorArrow.addEventListener("click", ()=>{
    navLinks.classList.toggle("show1");
});

let regArrow = document.querySelector(".reg-arrow");
regArrow.addEventListener("click", ()=>{
    navLinks.classList.toggle("show2");
});