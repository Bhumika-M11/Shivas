"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // STICKY HEADER
    // ==========================================

    const header = document.querySelector(".header");

    function updateStickyHeader() {
        if (!header) return;

        header.classList.toggle("sticky", window.scrollY > 50);
    }

    updateStickyHeader();

    window.addEventListener("scroll", updateStickyHeader, {
        passive: true
    });


    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    const menuBtn = document.querySelector(".menu-btn");
    const navMenu = document.querySelector(".nav-menu");
    const menuIcon = menuBtn?.querySelector("i");

    function closeMobileMenu() {
        if (!navMenu || !menuBtn) return;

        navMenu.classList.remove("active");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation menu");

        if (menuIcon) {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    }

    function toggleMobileMenu() {
        if (!navMenu || !menuBtn) return;

        const isOpen = navMenu.classList.toggle("active");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        if (menuIcon) {
            menuIcon.classList.toggle("fa-bars", !isOpen);
            menuIcon.classList.toggle("fa-xmark", isOpen);
        }
    }

    menuBtn?.addEventListener("click", toggleMobileMenu);

    navMenu?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMobileMenu);
    });

    // Close menu when clicking outside it.
    document.addEventListener("click", event => {
        if (!navMenu || !menuBtn) return;

        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            closeMobileMenu();
        }
    });

    // Close menu when switching to desktop width.
    window.addEventListener("resize", () => {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });


    // ==========================================
    // DROPDOWN NAVIGATION ON MOBILE
    // ==========================================

    document.querySelectorAll(".dropdown").forEach(dropdown => {

        const toggle = dropdown.querySelector(".dropdown-toggle");
        const submenu = dropdown.querySelector(".dropdown-menu");

        if (!toggle || !submenu) return;

        toggle.setAttribute("aria-haspopup", "true");
        toggle.setAttribute("aria-expanded", "false");

        toggle.addEventListener("click", event => {

            // Only use click-to-expand behavior on mobile/tablet.
            if (window.innerWidth > 992) return;

            event.preventDefault();

            const isOpen = dropdown.classList.toggle("open");

            toggle.setAttribute("aria-expanded", String(isOpen));

        });

    });


    // ==========================================
    // HERO BACKGROUND SLIDER
    // ==========================================

    const slides = Array.from(document.querySelectorAll(".slide"));

    let currentSlide = Math.max(
        0,
        slides.findIndex(slide => slide.classList.contains("active"))
    );

    let heroInterval = null;

    function showSlide(index) {
        if (!slides.length) return;

        currentSlide = ((index % slides.length) + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === currentSlide);
        });
    }

    function nextSlide() {
        if (slides.length < 2) return;
        showSlide(currentSlide + 1);
    }

    function stopHeroSlider() {
        if (heroInterval !== null) {
            clearInterval(heroInterval);
            heroInterval = null;
        }
    }

    function startHeroSlider() {
        stopHeroSlider();

        if (slides.length < 2 || document.hidden) return;

        heroInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length) {
        showSlide(currentSlide);
        startHeroSlider();
    }

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopHeroSlider();
        } else {
            startHeroSlider();
        }
    });


    // ==========================================
    // SMOOTH SCROLL
    // ==========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const href = anchor.getAttribute("href");

            if (!href || href === "#") return;

            let target;

            try {
                target = document.querySelector(href);
            } catch {
                return;
            }

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.getBoundingClientRect().height
                : 0;

            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                12;

            window.scrollTo({
                top: Math.max(0, targetTop),
                behavior: "smooth"
            });

        });

    });


    // ==========================================
    // ACTIVE NAVIGATION
    // ==========================================

    const sections = document.querySelectorAll("main section[id], section[id]");
    const navLinks = document.querySelectorAll(".nav-menu a");

    function updateActiveNavigation() {

        if (!sections.length || !navLinks.length) return;

        let currentId = "";

        const scrollPosition = window.scrollY + 160;

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentId) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation, {
        passive: true
    });

    updateActiveNavigation();


    // ==========================================
    // HERO TEXT ANIMATION
    // ==========================================

    function revealHero() {
        const heroContent = document.querySelector(".hero-content");

        if (heroContent) {
            heroContent.classList.add("loaded");
        }
    }

    if (document.readyState === "complete") {
        revealHero();
    } else {
        window.addEventListener("load", revealHero, { once: true });
    }


    // ==========================================
    // SERVICE CARD REVEAL ANIMATION
    // ==========================================

    const serviceCards = document.querySelectorAll(".service-card");

    if ("IntersectionObserver" in window && serviceCards.length) {

        const serviceObserver = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);

            });

        }, {
            threshold: 0.12
        });

        serviceCards.forEach(card => {
            card.classList.add("reveal-card");
            serviceObserver.observe(card);
        });

    } else {
        serviceCards.forEach(card => {
            card.classList.add("visible");
        });
    }


    // ==========================================
    // ANIMATED COUNTERS
    // ==========================================

    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats");

    let countersStarted = false;

    function animateCounter(counter) {

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target) || target < 0) return;

        const duration = 1400;
        const startTime = performance.now();

        function updateCounter(now) {

            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.floor(target * progress);

            if (target >= 1000) {
                counter.textContent =
                    (value / 1000).toFixed(value >= 10000 ? 0 : 1)
                    .replace(/\.0$/, "") + "K+";
            } else {
                counter.textContent = value + (progress === 1 ? "+" : "");
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }

        }

        requestAnimationFrame(updateCounter);
    }

    function startCounters() {

        if (countersStarted) return;

        countersStarted = true;

        counters.forEach(animateCounter);
    }

    if (statsSection && counters.length) {

        if ("IntersectionObserver" in window) {

            const statsObserver = new IntersectionObserver(entries => {

                if (entries[0]?.isIntersecting) {
                    startCounters();
                    statsObserver.disconnect();
                }

            }, {
                threshold: 0.2
            });

            statsObserver.observe(statsSection);

        } else {
            startCounters();
        }

    }


    // ==========================================
    // PAGE LOADER
    // ==========================================

    function hideLoader() {
        const loader = document.querySelector(".loader");

        if (loader) {
            loader.classList.add("hide");
        }
    }

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, { once: true });
    }

});
