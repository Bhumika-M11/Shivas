// ===============================
// Sticky Header
// ===============================

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }

});

// ===============================
// Mobile Menu
// ===============================

const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".menu-btn i");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    if (navMenu.classList.contains("active")) {
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    } else {
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    }

});

// Close menu after clicking a link

document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});

// ===============================
// Hero Background Slider
// ===============================

const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

function showSlide(index){

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

setInterval(nextSlide, 5000);

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            e.preventDefault();

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});

// ===============================
// Hero Text Animation
// ===============================

window.addEventListener("load",()=>{

    document.querySelector(".hero-content").classList.add("loaded");

});

// Service Cards Animation

const serviceCards = document.querySelectorAll(".service-card");

const serviceObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

serviceCards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s ease";

serviceObserver.observe(card);

});

// ===============================
// Animated Counter
// ===============================

const counters = document.querySelectorAll(".counter");

const speed = 200;

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const update = () => {

            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {

                counter.innerText = Math.ceil(count + increment);

                setTimeout(update, 10);

            } else {

                if (target >= 1000) {

                    counter.innerText = (target / 1000) + "K+";

                } else {

                    counter.innerText = target + "+";

                }

            }

        };

        update();

    });

};

const statsSection = document.querySelector(".stats");

const observer = new IntersectionObserver((entries) => {

    if (entries[0].isIntersecting) {

        startCounter();

        observer.disconnect();

    }

});

observer.observe(statsSection);

/* Loader */

window.addEventListener("load", () => {

    document.querySelector(".loader").classList.add("hide");

});

/* Back To Top */

const backTop = document.querySelector(".back-top");

window.addEventListener("scroll", () => {

    if(window.scrollY > 500){

        backTop.style.opacity = "1";
        backTop.style.visibility = "visible";

    }else{

        backTop.style.opacity = "0";
        backTop.style.visibility = "hidden";

    }

});

