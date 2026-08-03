/*=====================================================
PART 16A
Scroll Reveal + Counter + Active Navigation
=====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      SCROLL REVEAL ANIMATION
    =========================================*/

    const revealElements = document.querySelectorAll(
        ".why-card, .location-card, .info-card, .spec-card, .travel-card, .route-card, .pricing-card, .summary-box, .contact-card"
    );

    const revealObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach((element, index) => {

        element.style.opacity = "0";
        element.style.transform = "translateY(60px)";
        element.style.transition = `all .8s ease ${index * 0.08}s`;

        revealObserver.observe(element);

    });

    /*=========================================
      COUNTER ANIMATION
    =========================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            const duration = 2000;

            let start = 0;

            const increment = target / (duration / 16);

            function updateCounter() {

                start += increment;

                if (start < target) {

                    counter.textContent = Math.floor(start);

                    requestAnimationFrame(updateCounter);

                } else {

                    if (target >= 1000) {

                        counter.textContent = (target / 1000) + "K+";

                    } else {

                        counter.textContent = target + "+";

                    }

                }

            }

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {

        threshold: 0.5

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*=========================================
      ACTIVE NAVIGATION
    =========================================*/

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < top + height) {

                current = section.id;

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /*=========================================
      SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }

        });

    });

});

/*=========================================
TESTIMONIAL AUTO SLIDER
=========================================*/

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const testimonialDots = document.querySelectorAll(".testimonial-dots .dot");

if (testimonialTrack && testimonialCards.length > 0) {

    let currentTestimonial = 0;

    function showTestimonial(index){

        testimonialTrack.style.transform =
            `translateX(-${index * 100}%)`;

        testimonialDots.forEach(dot =>
            dot.classList.remove("active")
        );

        testimonialDots[index].classList.add("active");

    }

    function nextTestimonial(){

        currentTestimonial++;

        if(currentTestimonial >= testimonialCards.length){

            currentTestimonial = 0;

        }

        showTestimonial(currentTestimonial);

    }

    let testimonialInterval = setInterval(nextTestimonial,5000);

    testimonialDots.forEach((dot,index)=>{

        dot.addEventListener("click",()=>{

            currentTestimonial=index;

            showTestimonial(currentTestimonial);

            clearInterval(testimonialInterval);

            testimonialInterval=setInterval(nextTestimonial,5000);

        });

    });

    const slider=document.querySelector(".testimonial-slider");

    slider.addEventListener("mouseenter",()=>{

        clearInterval(testimonialInterval);

    });

    slider.addEventListener("mouseleave",()=>{

        testimonialInterval=setInterval(nextTestimonial,5000);

    });

    /* Mobile Swipe */

    let startX=0;

    slider.addEventListener("touchstart",(e)=>{

        startX=e.touches[0].clientX;

    },{passive:true});

    slider.addEventListener("touchend",(e)=>{

        let endX=e.changedTouches[0].clientX;

        let move=startX-endX;

        if(Math.abs(move)>60){

            if(move>0){

                currentTestimonial++;

                if(currentTestimonial>=testimonialCards.length){

                    currentTestimonial=0;

                }

            }else{

                currentTestimonial--;

                if(currentTestimonial<0){

                    currentTestimonial=testimonialCards.length-1;

                }

            }

            showTestimonial(currentTestimonial);

        }

    },{passive:true});

}


/*=========================================
RANDOM RATING ANIMATION
=========================================*/

const ratingElement=document.querySelector(".review-summary h2");

if(ratingElement){

    function updateRating(){

        const ratings=[
            "4.8★",
            "4.9★",
            "5.0★",
            "4.9★",
            "4.8★"
        ];

        const random=Math.floor(Math.random()*ratings.length);

        ratingElement.textContent=ratings[random];

    }

    updateRating();

    setInterval(updateRating,12000);

}


/*=========================================
RANDOM REVIEW COUNT
=========================================*/

const tripBox=document.querySelectorAll(".summary-box h2");

if(tripBox.length>1){

    let trips=1025;

    function updateTrips(){

        trips+=Math.floor(Math.random()*4);

        tripBox[1].textContent=trips+"+";

    }

    updateTrips();

    setInterval(updateTrips,8000);

}


/*=========================================
RANDOM CUSTOMER PERCENTAGE
=========================================*/

if(tripBox.length>2){

    function updateCustomers(){

        const percent=97+Math.floor(Math.random()*3);

        tripBox[2].textContent=percent+"%";

    }

    updateCustomers();

    setInterval(updateCustomers,10000);

}

/*=========================================
FAQ ACCORDION
=========================================*/

const faqItems = document.querySelectorAll(".faq-item");

if (faqItems.length > 0) {

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon i");

        /* Set Initial Height */

        if (item.classList.contains("active")) {

            answer.style.maxHeight = answer.scrollHeight + "px";

            if(icon){
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }

        } else {

            answer.style.maxHeight = "0px";

        }

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            /* Close All */

            faqItems.forEach((faq) => {

                faq.classList.remove("active");

                const faqAnswer = faq.querySelector(".faq-answer");
                const faqIcon = faq.querySelector(".faq-icon i");

                faqAnswer.style.maxHeight = "0px";

                if(faqIcon){

                    faqIcon.classList.remove("fa-minus");
                    faqIcon.classList.add("fa-plus");

                }

            });

            /* Open Current */

            if (!isActive) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

                if(icon){

                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");

                }

                /* Scroll Smoothly */

                setTimeout(() => {

                    item.scrollIntoView({

                        behavior: "smooth",
                        block: "nearest"

                    });

                },150);

            }

        });

        /* Keyboard Support */

        question.setAttribute("tabindex","0");

        question.addEventListener("keydown",(e)=>{

            if(e.key==="Enter" || e.key===" "){

                e.preventDefault();

                question.click();

            }

        });

    });

}

/*=========================================
FAQ OPEN FIRST ITEM
=========================================*/

window.addEventListener("load",()=>{

    const first=document.querySelector(".faq-item.active");

    if(first){

        const ans=first.querySelector(".faq-answer");

        ans.style.maxHeight=ans.scrollHeight+"px";

    }

});

/*=========================================
FAQ ICON ROTATION
=========================================*/

faqItems.forEach(item=>{

    const question=item.querySelector(".faq-question");
    const icon=item.querySelector(".faq-icon");

    question.addEventListener("click",()=>{

        icon.style.transition=".35s";

        if(item.classList.contains("active")){

            icon.style.transform="rotate(180deg)";

        }else{

            icon.style.transform="rotate(0deg)";

        }

    });

});

/*=========================================
CONTACT FORM
=========================================*/

const contactForm = document.getElementById("contactForm");

if(contactForm){

    contactForm.addEventListener("submit",function(e){

        e.preventDefault();

        const name=this.querySelector('input[type="text"]').value.trim();
        const phone=this.querySelector('input[type="tel"]').value.trim();
        const email=this.querySelector('input[type="email"]').value.trim();
        const service=this.querySelectorAll("select")[0].value;
        const pickup=this.querySelectorAll('input[type="text"]')[1].value.trim();
        const drop=this.querySelectorAll('input[type="text"]')[2].value.trim();
        const date=this.querySelector('input[type="date"]').value;
        const time=this.querySelector('input[type="time"]').value;
        const passengers=this.querySelectorAll("select")[1].value;
        const vehicle=this.querySelectorAll("select")[2].value;
        const message=this.querySelector("textarea").value.trim();

        /* Validation */

        if(name.length<3){

            alert("Please enter your full name.");

            return;

        }

        if(!/^[6-9]\d{9}$/.test(phone)){

            alert("Please enter a valid mobile number.");

            return;

        }

        if(email!=="" && !/^\S+@\S+\.\S+$/.test(email)){

            alert("Please enter a valid email.");

            return;

        }

        const submitBtn=this.querySelector("button");

        submitBtn.disabled=true;

        submitBtn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        /* WhatsApp Message */

        const whatsappMessage=

`Hello Shivas Travel Guru,

Name : ${name}

Phone : ${phone}

Email : ${email}

Service : ${service}

Pickup : ${pickup}

Drop : ${drop}

Travel Date : ${date}

Time : ${time}

Passengers : ${passengers}

Vehicle : ${vehicle}

Requirements :

${message}`;

        setTimeout(()=>{

            submitBtn.disabled=false;

            submitBtn.innerHTML="Get Instant Quote";

            window.open(

`https://wa.me/919999999999?text=${encodeURIComponent(whatsappMessage)}`,

"_blank"

);

            contactForm.reset();

            alert("Thank you! Redirecting to WhatsApp.");

        },1200);

    });

}

/*=========================================
BACK TO TOP
=========================================*/

const backTop=document.querySelector(".back-top");

if(backTop){

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

backTop.classList.add("show");

}else{

backTop.classList.remove("show");

}

});

backTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}

/*=========================================
SCROLL PROGRESS BAR
=========================================*/

const progressBar=document.querySelector(".progress-bar");

if(progressBar){

window.addEventListener("scroll",()=>{

const scroll=

(document.documentElement.scrollTop/

(document.documentElement.scrollHeight-document.documentElement.clientHeight))*100;

progressBar.style.width=scroll+"%";

});

}

/*=========================================
PRELOADER
=========================================*/

window.addEventListener("load",()=>{

const loader=document.querySelector(".loader");

if(loader){

loader.classList.add("hide");

setTimeout(()=>{

loader.remove();

},600);

}

});

/*=========================================
LAZY LOADING IMAGES
=========================================*/

const lazyImages=document.querySelectorAll("img[data-src]");

if(lazyImages.length){

const imageObserver=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const img=entry.target;

img.src=img.dataset.src;

img.removeAttribute("data-src");

imageObserver.unobserve(img);

}

});

});

lazyImages.forEach(img=>{

imageObserver.observe(img);

});

}

/*=========================================
BUTTON RIPPLE EFFECT
=========================================*/

document.querySelectorAll(".btn,.pricing-btn,.route-btn,.travel-btn").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";
ripple.style.height=size+"px";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";

ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},600);

});

});

/*=========================================
NETWORK STATUS
=========================================*/

window.addEventListener("offline",()=>{

alert("No Internet Connection.");

});

window.addEventListener("online",()=>{

console.log("Internet Connected.");

});

/*=========================================
CONSOLE BRANDING
=========================================*/

console.log("%cShivas Travel Guru","font-size:24px;color:#00B894;font-weight:bold;");
console.log("%cPremium Urbania Rental Website","font-size:14px;color:#0A3D62;");