const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");
const menuIcon = document.querySelector(".menu-btn i");

menuBtn?.addEventListener("click", () => {

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