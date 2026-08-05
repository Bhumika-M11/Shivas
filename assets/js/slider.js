/*=========================================
VEHICLE IMAGE SLIDER
=========================================*/

document.querySelectorAll(".vehicle-image-slider").forEach((slider) => {

    const images = slider.querySelectorAll(".vehicle-slides img");
    const dots = slider.querySelectorAll(".dot");

    let current = 0;

    function showSlide(index) {

        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            current = index;
            showSlide(current);
        });
    });

    setInterval(() => {

        current = (current + 1) % images.length;

        showSlide(current);

    }, 2500);

});

/*=========================================
HORIZONTAL VEHICLE SLIDER
=========================================*/

document.querySelectorAll(".slider-container").forEach(container => {

    const slider = container.querySelector(".vehicle-slider");

    if (!slider) return;

    const nextBtn = container.parentElement.querySelector(".next-btn,.out-next-btn");
    const prevBtn = container.parentElement.querySelector(".prev-btn,.out-prev-btn");

    let cardWidth = 0;

    function updateCardWidth() {

        const card = slider.querySelector(".vehicle-card");

        if(card){
            cardWidth = card.getBoundingClientRect().width + 25;
        }

    }

    updateCardWidth();

    window.addEventListener("resize", updateCardWidth);

    nextBtn?.addEventListener("click", () => {

        slider.scrollBy({
            left: cardWidth,
            behavior: "smooth"
        });

    });

    prevBtn?.addEventListener("click", () => {

        slider.scrollBy({
            left: -cardWidth,
            behavior: "smooth"
        });

    });

    let auto;

    function startAuto(){

        auto = setInterval(() => {

            requestAnimationFrame(() => {

                if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 5){

                    slider.scrollTo({
                        left:0,
                        behavior:"smooth"
                    });

                }else{

                    slider.scrollBy({
                        left:cardWidth,
                        behavior:"smooth"
                    });

                }

            });

        },2500);

    }

    function stopAuto(){

        clearInterval(auto);

    }

    startAuto();

    container.addEventListener("mouseenter",stopAuto);

    container.addEventListener("mouseleave",startAuto);

});

/*==========================================
MOBILE SWIPE
=========================================*/

document.querySelectorAll(".vehicle-slider").forEach(slider => {

    let startX = 0;

    slider.addEventListener("touchstart",(e)=>{

        if (!e.touches || !e.touches[0]) return;
        startX = e.touches[0].clientX;

    },{passive:true});

    slider.addEventListener("touchend",(e)=>{

        if (!e.changedTouches || !e.changedTouches[0]) return;

        const endX = e.changedTouches[0].clientX;

        const move = startX - endX;

        if(Math.abs(move) > 50){

            slider.scrollBy({

                left: move > 0 ? 300 : -300,

                behavior:"smooth"

            });

        }

    },{passive:true});

});

/*==========================================
LIVE ROTATING REVIEWS (null-safe + real assets)
=========================================*/

const reviews = [
{
    name:"Rahul Sharma",
    place:"Bengaluru",
    stars:"★ ★ ★ ★ ★",
    review:"Excellent cab service! Driver arrived on time and the journey to Mysore was very comfortable."
},
{
    name:"Priya Nair",
    place:"Mysuru",
    stars:"★ ★ ★ ★ ★",
    review:"Booked an airport transfer at midnight. Very professional driver and clean vehicle."
},
{
    name:"Arjun Kumar",
    place:"Mangaluru",
    stars:"★ ★ ★ ★ ★",
    review:"Our Coorg family trip was wonderful. Affordable pricing and friendly service."
},
{
    name:"Sneha Reddy",
    place:"Hyderabad",
    stars:"★ ★ ★ ★ ★",
    review:"Best outstation taxi service. The driver knew all tourist places and drove safely."
},
{
    name:"Vijay Patel",
    place:"Hubballi",
    stars:"★ ★ ★ ★ ★",
    review:"Vehicle was well maintained and booking was very easy. Highly recommended."
}
];

function updateReview(){

    const nameEl = document.getElementById("reviewName");
    const placeEl = document.getElementById("reviewPlace");
    const textEl = document.getElementById("reviewText");
    const starsEl = document.getElementById("reviewStars");

    if (!nameEl || !placeEl || !textEl || !starsEl) return;

    const review = reviews[Math.floor(Math.random() * reviews.length)];

    nameEl.textContent = review.name;
    placeEl.textContent = review.place;
    textEl.textContent = review.review;
    starsEl.textContent = review.stars;
}

updateReview();
setInterval(updateReview, 7000);