// =====================================================
// SEDAN WEBSITE JAVASCRIPT
// =====================================================


// ===============================
// IMAGE GALLERY
// ===============================

const mainImage = document.querySelector("#mainImage");

const thumbnails = document.querySelectorAll(".thumbs button");


thumbnails.forEach(button => {

    button.addEventListener("click", () => {

        const image = button.dataset.img;

        if (mainImage && image) {
            mainImage.src = image;
        }


        document
            .querySelectorAll(".thumbs button")
            .forEach(btn => {
                btn.classList.remove("active");
            });


        button.classList.add("active");

    });

});


// ===============================
// FAVORITE BUTTON
// ===============================

const heart = document.querySelector("#heart");


if (heart) {

    heart.addEventListener("click", () => {

        if (heart.textContent.trim() === "♡") {

            heart.textContent = "♥";

            heart.style.color = "#D4AF37";

        } else {

            heart.textContent = "♡";

            heart.style.color = "#777";

        }

    });

}


// ===============================
// MOBILE MENU
// ===============================

const menuButton = document.querySelector(".menu-btn");

const navMenu = document.querySelector(".nav-menu");


if (menuButton && navMenu) {

    menuButton.addEventListener("click", () => {

        navMenu.classList.toggle("open");

    });

}


// ===============================
// BOOKING BUTTONS
// ===============================

const bookingButtons =
    document.querySelectorAll(".booking");


bookingButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.location.href = "form.html";

    });

});


// ===============================
// WHATSAPP BUTTONS
// ===============================

const whatsappButtons =
    document.querySelectorAll(".whatsapp");


whatsappButtons.forEach(button => {

    button.addEventListener("click", () => {

        window.open(
            "https://wa.me/919019993283",
            "_blank"
        );

    });

});