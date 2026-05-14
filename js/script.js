let navbar = document.querySelector('.header .navbar');
let searchForm = document.querySelector('.header .search-form');
let loginForm = document.querySelector('.header .login-form');
let contactInfo = document.querySelector('.contact-info');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
}

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

document.querySelector('#login-btn').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

document.querySelector('#info-btn').onclick = () =>{
    contactInfo.classList.add('active');
}

document.querySelector('#close-contact-info').onclick = () =>{
    contactInfo.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    contactInfo.classList.remove('active');
}

// ============================
// CURSOR GLOW SYSTEM
// ============================

const glow = document.createElement("div");
glow.className = "cursor-glow";
document.body.appendChild(glow);

let x = 0, y = 0;

document.addEventListener("mousemove", (e) => {
  x = e.clientX;
  y = e.clientY;
});

function animateCursor() {
  glow.style.left = x + "px";
  glow.style.top = y + "px";
  requestAnimationFrame(animateCursor);
}

animateCursor();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, {
  threshold: 0.25
});

sections.forEach(sec => observer.observe(sec));

document.addEventListener("mousemove", (e) => {
  document.body.style.setProperty("--x", e.clientX + "px");
  document.body.style.setProperty("--y", e.clientY + "px");
});

// ============================
// ELITE PARALLAX ENGINE
// ============================

window.addEventListener("scroll", () => {
  let value = window.scrollY;

  document.querySelectorAll(".home .slide").forEach((slide) => {
    slide.style.transform = `scale(1.05) translateY(${value * 0.2}px)`;
  });

  document.querySelectorAll("section").forEach((sec, i) => {
    sec.style.transform = `translateY(${value * (0.02 * i)}px)`;
  });
});

var swiper = new Swiper(".home-slider", {
  loop: true,
  centeredSlides: true,
  autoplay:{ delay: 3500,},
  grabCursor: true,
  speed: 1400,
  spaceBetween: 0,
  effect: "slide",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});

var reviews = new Swiper(".reviews-slider", {
  loop: true,
  centeredSlides: true,
  autoplay:{ delay: 3500,},
  spaceBetween: 30,
  speed: 1000,
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2.2 }
  }
});

var logo = new Swiper(".logo-slider", {
  loop: true,
  autoplay:{ delay: 3500,},
  centeredSlides: true,
  spaceBetween: 10,
  speed: 1000,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 2.2 }
  }
});

var swiper = new Swiper(".blogs-slider", {
    loop:true,
    autoplay:{ delay: 3500,},
    grabCursor:true,
    centeredSlides: true,
    spaceBetween: 10,
    breakpoints:{
        640:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        991:{
            slidesPerView: 3,
        },
    },
});

var homeSwiper = new Swiper(".home-slider", {
    loop: true,
    autoplay: {
        delay: 3500,
    },
    on: {
        slideChange: function () {
            // document.querySelectorAll('.bg-video').forEach(video => {
            //     video.pause();
            // });

            let activeSlide = document.querySelector('.swiper-slide-active .bg-video');
            if (activeSlide) activeSlide.play();
        }
    }
});

window.addEventListener("load", () => {
    document.querySelectorAll(".bg-video").forEach(video => {
        video.muted = true;
        video.play().catch(() => {});
    });
});

var projectBg = new Swiper(".project-bg", {
    loop: true,
    effect: "fade",
    autoplay: {
        delay: 300,
        disableOnInteraction: false,
    },
});

var topSlider = new Swiper(".top-slider", {

    loop: true,
    speed: 5000,
    slidesPerView: 3,
    spaceBetween: 25,
    centeredSlides: true,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },

    allowTouchMove: true,

    breakpoints: {

        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        991: {
            slidesPerView: 3,
        }
    }
});

var bottomSlider = new Swiper(".bottom-slider", {

    loop: true,
    speed: 5000,
    slidesPerView: 3,
    spaceBetween: 25,
    centeredSlides: true,

    autoplay: {
        delay: 0,
        reverseDirection: true,
        disableOnInteraction: false,
    },

    allowTouchMove: true,

    breakpoints: {

        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        991: {
            slidesPerView: 3,
        }
    }
});

window.addEventListener("load", () => {

    if(window.location.hash === "#login"){

        document.querySelector(".login-form")
            .classList.add("active");

    }

});


//////////////////////////////
// 1. SWIPER INITIALIZATION
//////////////////////////////

document.querySelector(".row-left").classList.add("swiper");
document.querySelector(".row-left").innerHTML =
    `<div class="swiper-wrapper">` +
    document.querySelector(".row-left").innerHTML +
    `</div>`;

document.querySelector(".row-right").classList.add("swiper");
document.querySelector(".row-right").innerHTML =
    `<div class="swiper-wrapper">` +
    document.querySelector(".row-right").innerHTML +
    `</div>`;

document.querySelectorAll(".about-column").forEach(slide => {
    slide.classList.add("swiper-slide");
});

new Swiper(".row-left", {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 6000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
});

new Swiper(".row-right", {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 6000,
    autoplay: {
        delay: 0,
        reverseDirection: true,
        disableOnInteraction: false,
    },
    allowTouchMove: true,
});


//////////////////////////////
// 2. VIDEO SYSTEM STATE
//////////////////////////////

const videos = Array.from(document.querySelectorAll(".about-column video"));

let currentIndex = 0;

const popup = document.getElementById("videoPopup");
const popupVideo = document.getElementById("popupVideo");
const closePopup = document.getElementById("closePopup");


//////////////////////////////
// 3. OPEN VIDEO POPUP
//////////////////////////////

videos.forEach((video, index) => {
    video.addEventListener("click", (e) => {
        e.stopPropagation();

        currentIndex = index;

        openPopup(video.src || video.currentSrc);
    });
});


function openPopup(src) {
    pauseAllBackgroundVideos();

    popupVideo.src = src;
    popup.style.display = "flex";
    popupVideo.play();
}


//////////////////////////////
// 4. SWIPE CONTROLS
//////////////////////////////

let startX = 0;

popupVideo.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

popupVideo.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            nextVideo();
        } else {
            prevVideo();
        }
    }
});


function nextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    changeVideo();
}

function prevVideo() {
    currentIndex = (currentIndex - 1 + videos.length) % videos.length;
    changeVideo();
}

function changeVideo() {
    popupVideo.pause();
    popupVideo.src = videos[currentIndex].src;
    popupVideo.play();
}


//////////////////////////////
// 5. CLOSE POPUP
//////////////////////////////

function closeVideoPopup() {
    popupVideo.pause();
    popupVideo.src = "";
    popup.style.display = "none";

    resumeBackgroundVideos();
}

closePopup.addEventListener("click", closeVideoPopup);

popup.addEventListener("click", (e) => {
    if (e.target === popup) {
        closeVideoPopup();
    }
});


//////////////////////////////
// 6. AUTOPLAY CONTROL
//////////////////////////////

function pauseAllBackgroundVideos() {
    videos.forEach(v => v.pause());
}

function resumeBackgroundVideos() {
    videos.forEach(v => {
        v.play().catch(() => {});
    });
}


// Testing image viewing in Projects section stars here

document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.querySelector(".project-lightbox");
  const closeBtn = document.querySelector(".project-lightbox-close");
  const wrapper = document.querySelector(".project-lightbox-swiper .swiper-wrapper");

  const boxes = document.querySelectorAll(".projects .box");

  let images = [];

  // collect images
  boxes.forEach((box, index) => {
    const img = box.querySelector("img").src;
    images.push(img);

    box.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // build slides BEFORE swiper init
  images.forEach((src) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `<img src="${src}">`;
    wrapper.appendChild(slide);
  });

  // INIT SWIPER AFTER slides exist
  const swiper = new Swiper(".project-lightbox-swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  function openLightbox(index) {
    lightbox.classList.add("active");
    swiper.update();
    swiper.slideToLoop(index, 0);
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

});

// Testing image viewing in Projects section ends here