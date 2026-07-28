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

    }, 5000);

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

        },5000);

    }

    function stopAuto(){

        clearInterval(auto);

    }

    startAuto();

    container.addEventListener("mouseenter",stopAuto);

    container.addEventListener("mouseleave",startAuto);

});

setInterval(() => {
    document.querySelectorAll(".vehicle-slider").forEach(slider => {
        slider.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    });
}, 5000);


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