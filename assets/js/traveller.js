
(function () {
    'use strict';

    /* --------------------------------------------------
       0. CONFIG
       Paste your Google Apps Script web-app URL below to
       save enquiry/booking leads to a Google Sheet.
    -------------------------------------------------- */
    var SHEETS_URL = "";

    var WA_NUMBER = "919019993283";
    var WA_PREFIX = "https://wa.me/" + WA_NUMBER + "/?text=";

    function onReady(fn) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn);
        } else {
            fn();
        }
    }

    /* --------------------------------------------------
       1. STICKY HEADER
    -------------------------------------------------- */
    function initStickyHeader() {
        var header = document.querySelector(".header");
        if (!header) return;

        var onScroll = function () {
            header.classList.toggle("sticky", window.scrollY > 40);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* --------------------------------------------------
       2. SCROLL PROGRESS BAR
    -------------------------------------------------- */
    function initProgressBar() {
        var bar = document.querySelector(".scroll-progress");
        if (!bar) return;

        var onScroll = function () {
            var h = document.documentElement;
            var max = h.scrollHeight - h.clientHeight;
            var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
            bar.style.width = pct + "%";
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    /* --------------------------------------------------
       3. MOBILE NAVIGATION
    -------------------------------------------------- */
    function initMobileNav() {
        var menuBtn = document.getElementById("menuBtn");
        var navMenu = document.getElementById("navMenu");
        if (!menuBtn || !navMenu) return;

        var toggle = function (open) {
            var willOpen = typeof open === "boolean" ? open : !navMenu.classList.contains("open");
            navMenu.classList.toggle("open", willOpen);
            menuBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");
            menuBtn.innerHTML = willOpen
                ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
                : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        };

        menuBtn.addEventListener("click", function () { toggle(); });

        navMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () { toggle(false); });
        });
    }

    /* --------------------------------------------------
       4. SCROLL REVEAL (Fade Up) — IntersectionObserver
    -------------------------------------------------- */
    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length) return;

        if (!("IntersectionObserver" in window)) {
            items.forEach(function (el) { el.classList.add("visible"); });
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

        items.forEach(function (el) { io.observe(el); });
    }

    /* --------------------------------------------------
       5. COUNTER ANIMATION
    -------------------------------------------------- */
    function initCounters() {
        var counters = document.querySelectorAll(".counter");
        if (!counters.length) return;

        var animate = function (el) {
            var target = parseFloat(el.getAttribute("data-target")) || 0;
            var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
            var suffix = el.getAttribute("data-suffix") || "";
            var duration = 1600;
            var start = null;

            var step = function (timestamp) {
                if (!start) start = timestamp;
                var progress = Math.min((timestamp - start) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                var value = target * eased;
                el.textContent = value.toFixed(decimals) + suffix;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target.toFixed(decimals) + suffix;
                }
            };
            requestAnimationFrame(step);
        };

        if (!("IntersectionObserver" in window)) {
            counters.forEach(animate);
            return;
        }

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animate(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(function (el) { io.observe(el); });
    }
    /* --------------------------------------------------
       7. FAQ ACCORDION
    -------------------------------------------------- */
    function initFaq() {
        var items = document.querySelectorAll(".faq-item");
        if (!items.length) return;

        items.forEach(function (item) {
            var btn = item.querySelector(".faq-q");
            var panel = item.querySelector(".faq-a");
            if (!btn || !panel) return;

            btn.addEventListener("click", function () {
                var isOpen = item.classList.contains("open");

                items.forEach(function (other) {
                    var otherPanel = other.querySelector(".faq-a");
                    other.classList.remove("open");
                    other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
                    if (otherPanel) otherPanel.style.maxHeight = "0px";
                });

                if (!isOpen) {
                    item.classList.add("open");
                    btn.setAttribute("aria-expanded", "true");
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        });
    }

    /* --------------------------------------------------
       8. BUTTON RIPPLE
    -------------------------------------------------- */
    function initRipple() {
        var buttons = document.querySelectorAll(
            ".btn, .btn-wa, .btn-call, .btn-price, .btn-route"
        );

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function (e) {
                var rect = btn.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height);
                var ink = document.createElement("span");
                ink.className = "ripple-ink";
                ink.style.width = ink.style.height = size + "px";
                ink.style.left = (e.clientX - rect.left - size / 2) + "px";
                ink.style.top = (e.clientY - rect.top - size / 2) + "px";
                btn.appendChild(ink);
                setTimeout(function () { ink.remove(); }, 650);
            }, { passive: true });
        });
    }

    /* --------------------------------------------------
       9. BACK TO TOP
    -------------------------------------------------- */
    function initBackTop() {
        var btn = document.getElementById("backTop");
        if (!btn) return;

        var onScroll = function () {
            btn.classList.toggle("show", window.scrollY > 500);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* --------------------------------------------------
       11. YEAR
    -------------------------------------------------- */
    function initYear() {
        var el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------
       INIT
    -------------------------------------------------- */
    onReady(function () {
        initStickyHeader();
        initProgressBar();
        initMobileNav();
        initReveal();
        initCounters();
        initSlider();
        initFaq();
        initRipple();
        initBackTop();
        handleQuickBooking();
        handleEnquiry();
        initYear();
    });

})();
