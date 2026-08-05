/* ============================================
   SHIVAM TRAVELS — BANGALORE ↔ MYSORE
   Vanilla JS | No Dependencies
============================================ */
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
        var bar = document.getElementById("scrollProgress");
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
       5. TESTIMONIAL AUTO SLIDER
    -------------------------------------------------- */
    function initSlider() {
        var slider = document.getElementById("testimonialSlider");
        if (!slider) return;

        var track = slider.querySelector(".t-track");
        var cards = slider.querySelectorAll(".t-card");
        var dots = slider.querySelectorAll(".t-dot");
        if (!track || !cards.length) return;

        var index = 0;
        var timer = null;
        var interval = 5000;

        var go = function (i) {
            index = (i + cards.length) % cards.length;
            track.style.transform = "translateX(-" + index * 100 + "%)";
            dots.forEach(function (d, j) {
                d.classList.toggle("active", j === index);
            });
        };

        var next = function () { go(index + 1); };
        var prev = function () { go(index - 1); };

        var start = function () {
            stop();
            timer = setInterval(next, interval);
        };
        var stop = function () {
            if (timer) { clearInterval(timer); timer = null; }
        };

        dots.forEach(function (dot, i) {
            dot.addEventListener("click", function () {
                go(i);
                start();
            });
        });

        slider.addEventListener("mouseenter", stop);
        slider.addEventListener("mouseleave", start);
        slider.addEventListener("touchstart", stop, { passive: true });

        var touchX = 0;
        slider.addEventListener("touchstart", function (e) {
            touchX = e.changedTouches[0].clientX;
        }, { passive: true });

        slider.addEventListener("touchend", function (e) {
            var diff = e.changedTouches[0].clientX - touchX;
            if (Math.abs(diff) > 45) { diff < 0 ? next() : prev(); }
            start();
        }, { passive: true });

        document.addEventListener("visibilitychange", function () {
            if (document.hidden) { stop(); } else { start(); }
        });

        // Mark first card + dot active
        go(0);
        start();
    }

    /* --------------------------------------------------
       6. FAQ ACCORDION
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
       7. BUTTON RIPPLE
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
       8. BACK TO TOP
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
       9. FORMS — Google Sheet + WhatsApp Ready
    -------------------------------------------------- */
    function buildWhatsAppLink(title, fields) {
        var lines = [
            "Hello Shivam Travels!",
            title
        ];
        Object.keys(fields).forEach(function (key) {
            lines.push(key + ": " + fields[key]);
        });
        return WA_PREFIX + encodeURIComponent(lines.join("\n"));
    }

    function collectForm(form) {
        var data = {};
        form.querySelectorAll("input, select, textarea").forEach(function (el) {
            if (el.name && el.type !== "submit") {
                data[el.name] = el.value.trim();
            }
        });
        return data;
    }

    function submitToSheet(data) {
        if (!SHEETS_URL) return Promise.resolve(false);
        return fetch(SHEETS_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(data)
        }).then(function () { return true; }).catch(function () { return false; });
    }

    function openWhatsApp(url) {
        var wa = window.open(url, "_blank");
        if (!wa) { window.location.href = url; }
    }

    /* ---- Instant Quote form (hero) ---- */
    function handleQuoteForm() {
        var form = document.getElementById("quoteForm");
        if (!form) return;

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var data = collectForm(form);

            if (!data.pickup || !data.drop || !data.date) {
                alert("Please fill in pickup, drop and travel date for an instant quote.");
                return;
            }

            var url = buildWhatsAppLink("I need an instant quote for a Bangalore ↔ Mysore cab.", {
                "Route": data.route,
                "Pickup": data.pickup,
                "Drop": data.drop,
                "Travel Date": data.date,
                "Vehicle": data.vehicle
            });

            openWhatsApp(url);
            submitToSheet(Object.assign({ type: "Instant Quote" }, data));
            form.reset();
        });
    }

    /* ---- Full Booking form ---- */
    function handleBookingForm() {
        var form = document.getElementById("bookingForm");
        var status = document.getElementById("bookingStatus");
        if (!form) return;

        function setStatus(msg, type) {
            if (!status) return;
            status.textContent = msg;
            status.className = "form-status " + type;
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            var data = collectForm(form);
            var required = ["name", "phone", "pickup", "drop", "date", "vehicle", "passengers"];

            for (var i = 0; i < required.length; i++) {
                if (!data[required[i]]) {
                    setStatus("Please fill in all required fields.", "error");
                    return;
                }
            }

            var btn = document.getElementById("bSubmitBtn");
            if (!btn) return;
            var original = btn.innerHTML;
            btn.innerHTML = "Sending...";
            btn.disabled = true;

            submitToSheet(Object.assign({ type: "Booking" }, data)).then(function () {
                var url = buildWhatsAppLink("I would like to book a cab between Bangalore and Mysore.", {
                    "Name": data.name,
                    "Phone": data.phone,
                    "Email": data.email || "-",
                    "Service": data.service,
                    "Pickup": data.pickup,
                    "Drop": data.drop,
                    "Travel Date": data.date,
                    "Return Date": data.return_date || "-",
                    "Vehicle": data.vehicle,
                    "Passengers": data.passengers,
                    "Message": data.message || "-"
                });

                openWhatsApp(url);
                setStatus("Thank you, " + data.name + "! We've opened WhatsApp with your booking details. Our team will confirm shortly.", "success");
                form.reset();
            }).finally(function () {
                btn.innerHTML = original;
                btn.disabled = false;
            });
        });
    }

    /* --------------------------------------------------
       10. MINIMUM DATE (today) for date inputs
    -------------------------------------------------- */
    function initMinDates() {
        var today = new Date().toISOString().split("T")[0];
        var fields = document.querySelectorAll('input[type="date"]');
        fields.forEach(function (field) {
            if (!field.value) field.min = today;
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
        initSlider();
        initFaq();
        initRipple();
        initBackTop();
        handleQuoteForm();
        handleBookingForm();
        initMinDates();
        initYear();
    });

})();
