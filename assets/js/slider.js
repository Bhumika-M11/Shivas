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

/*=========================================
MOBILE SWIPE
=========================================*/

document.querySelectorAll(".vehicle-slider").forEach(slider => {

    let startX = 0;

    slider.addEventListener("touchstart",(e)=>{

        startX = e.touches[0].clientX;

    },{passive:true});

    slider.addEventListener("touchend",(e)=>{

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
/*rating*/

const ratings = [

    "4.8 ★",
    "4.9 ★",
    "5.0 ★",
    "4.9 ★"

];
function updateLiveRating(){

    document.getElementById("ratingValue").textContent =
        ratings[Math.floor(Math.random()*ratings.length)];

    document.getElementById("reviewCount").textContent =
        reviewCounts[Math.floor(Math.random()*reviewCounts.length)] +
        " Reviews";

    document.getElementById("bookingStatus").textContent =
        bookings[Math.floor(Math.random()*bookings.length)];

}

updateLiveRating();

setInterval(updateLiveRating,6000);

const reviews = [

{
    name:"Rahul Sharma",
    place:"Bengaluru",
    stars:"★★★★★",
    image:"images/users/user1.jpg",
    review:"Excellent cab service! Driver arrived on time and the journey to Mysore was very comfortable."
},

{
    name:"Priya Nair",
    place:"Mysuru",
    stars:"★★★★★",
    image:"images/users/user2.jpg",
    review:"Booked an airport transfer at midnight. Very professional driver and clean vehicle."
},

{
    name:"Arjun Kumar",
    place:"Mangaluru",
    stars:"★★★★★",
    image:"images/users/user3.jpg",
    review:"Our Coorg family trip was wonderful. Affordable pricing and friendly service."
},

{
    name:"Sneha Reddy",
    place:"Hyderabad",
    stars:"★★★★★",
    image:"images/users/user4.jpg",
    review:"Best outstation taxi service. The driver knew all tourist places and drove safely."
},

{
    name:"Vijay Patel",
    place:"Hubballi",
    stars:"★★★★★",
    image:"images/users/user5.jpg",
    review:"Vehicle was well maintained and booking was very easy. Highly recommended."
}

];

function updateReview(){

    const review = reviews[Math.floor(Math.random()*reviews.length)];

    document.getElementById("reviewName").textContent = review.name;
    document.getElementById("reviewPlace").textContent = review.place;
    document.getElementById("reviewText").textContent = review.review;
    document.getElementById("reviewStars").textContent = review.stars;
    document.getElementById("reviewImage").src = review.image;

}

updateReview();

setInterval(updateReview,5000);