/*=========================================
VEHICLE IMAGE SLIDER
=========================================*/

document.querySelectorAll(".vehicle-image-slider").forEach(slider => {

    const images = slider.querySelectorAll(".vehicle-slides img");
    const dots = slider.querySelectorAll(".dot");

    let current = 0;

    function showSlide(index){

        images.forEach(img => img.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));

        images[index].classList.add("active");
        dots[index].classList.add("active");
    }

    dots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            current=index;
            showSlide(current);

        });

    });

    setInterval(()=>{

        current++;

        if(current>=images.length){
            current=0;
        }

        showSlide(current);

    },3000);

});


/*=========================================
HORIZONTAL VEHICLE SLIDER
=========================================*/

document.querySelectorAll(".slider-container").forEach(container=>{

    const slider = container.querySelector(".vehicle-slider");

    const nextBtn = container.parentElement.querySelector(".next-btn, .out-next-btn");

    const prevBtn = container.parentElement.querySelector(".prev-btn, .out-prev-btn");

    if(!slider) return;

    const card = slider.querySelector(".vehicle-card");

    const gap = 25;

    let cardWidth = card.offsetWidth + gap;

    nextBtn?.addEventListener("click",()=>{

        slider.scrollBy({

            left:cardWidth,

            behavior:"smooth"

        });

    });

    prevBtn?.addEventListener("click",()=>{

        slider.scrollBy({

            left:-cardWidth,

            behavior:"smooth"

        });

    });

    let auto = setInterval(()=>{

        if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth-10){

            slider.scrollTo({

                left:0,

                behavior:"smooth"

            });

        }
        else{

            slider.scrollBy({

                left:cardWidth,

                behavior:"smooth"

            });

        }

    },4000);

    container.addEventListener("mouseenter",()=>{

        clearInterval(auto);

    });

    container.addEventListener("mouseleave",()=>{

        auto = setInterval(()=>{

            if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth-10){

                slider.scrollTo({

                    left:0,

                    behavior:"smooth"

                });

            }
            else{

                slider.scrollBy({

                    left:cardWidth,

                    behavior:"smooth"

                });

            }

        },4000);

    });

});


/*=========================================
MOBILE SWIPE
=========================================*/

document.querySelectorAll(".vehicle-slider").forEach(slider=>{

    let startX=0;

    slider.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

    });

    slider.addEventListener("touchend",(e)=>{

        const endX=e.changedTouches[0].clientX;

        const move=startX-endX;

        if(Math.abs(move)>50){

            slider.scrollBy({

                left:move>0?300:-300,

                behavior:"smooth"

            });

        }

    });

});