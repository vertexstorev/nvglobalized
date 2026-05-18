// ─── EMAILJS INIT ─────────────────────────────────────
emailjs.init("JYy2JApM1YPYVQmFD")

const WORKER_URL = "https://www.nvglobalizedug.com"

// ─── SAFE HELPER ──────────────────────────────────────
function on(selector, event, handler) {
  const el = document.querySelector(selector)
  if (el) el.addEventListener(event, handler)
}

// ─── NAVBAR ELEMENTS ──────────────────────────────────
const navbar = document.querySelector('.header .navbar')
const searchForm = document.querySelector('.header .search-form')
const loginForm = document.querySelector('.header .login-form')
const contactInfo = document.querySelector('.contact-info')

on('#menu-btn', 'click', () => {
  navbar.classList.toggle('active')
  searchForm.classList.remove('active')
  loginForm.classList.remove('active')
})

on('#search-btn', 'click', () => {
  searchForm.classList.toggle('active')
  navbar.classList.remove('active')
  loginForm.classList.remove('active')
})

on('#login-btn', 'click', () => {
  loginForm.classList.toggle('active')
  navbar.classList.remove('active')
  searchForm.classList.remove('active')
})

on('#info-btn', 'click', () => {
  if (contactInfo) contactInfo.classList.add('active')
})

on('#close-contact-info', 'click', () => {
  if (contactInfo) contactInfo.classList.remove('active')
})

window.onscroll = () => {
  if (navbar) navbar.classList.remove('active')
  if (searchForm) searchForm.classList.remove('active')
  if (loginForm) loginForm.classList.remove('active')
  if (contactInfo) contactInfo.classList.remove('active')
}

// ─── CURSOR GLOW ──────────────────────────────────────
const glow = document.createElement("div")
glow.className = "cursor-glow"
document.body.appendChild(glow)

let x = 0, y = 0

document.addEventListener("mousemove", (e) => {
  x = e.clientX
  y = e.clientY
  document.body.style.setProperty("--x", e.clientX + "px")
  document.body.style.setProperty("--y", e.clientY + "px")
})

function animateCursor() {
  glow.style.left = x + "px"
  glow.style.top = y + "px"
  requestAnimationFrame(animateCursor)
}
animateCursor()

// ─── INTERSECTION OBSERVER ────────────────────────────
const sections = document.querySelectorAll("section")
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("in-view")
  })
}, { threshold: 0.25 })
sections.forEach(sec => observer.observe(sec))

// ─── PARALLAX ─────────────────────────────────────────
window.addEventListener("scroll", () => {
  let value = window.scrollY
  document.querySelectorAll(".home .slide").forEach((slide) => {
    slide.style.transform = `scale(1.05) translateY(${value * 0.2}px)`
  })
  document.querySelectorAll("section").forEach((sec, i) => {
    sec.style.transform = `translateY(${value * (0.02 * i)}px)`
  })
})

// ─── SWIPERS ──────────────────────────────────────────
if (document.querySelector(".home-slider")) {
  var homeSwiper = new Swiper(".home-slider", {
    loop: true,
    centeredSlides: true,
    autoplay: { delay: 3500 },
    grabCursor: true,
    speed: 1400,
    spaceBetween: 0,
    effect: "slide",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        let activeSlide = document.querySelector('.swiper-slide-active .bg-video')
        if (activeSlide) activeSlide.play()
      }
    }
  })
}

if (document.querySelector(".reviews-slider")) {
  new Swiper(".reviews-slider", {
    loop: true,
    centeredSlides: true,
    autoplay: { delay: 3500 },
    spaceBetween: 30,
    speed: 1000,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2.2 }
    }
  })
}

if (document.querySelector(".logo-slider")) {
  new Swiper(".logo-slider", {
    loop: true,
    autoplay: { delay: 3500 },
    centeredSlides: true,
    spaceBetween: 10,
    speed: 1000,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 2.2 }
    }
  })
}

if (document.querySelector(".blogs-slider")) {
  new Swiper(".blogs-slider", {
    loop: true,
    autoplay: { delay: 3500 },
    grabCursor: true,
    centeredSlides: true,
    spaceBetween: 10,
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      991: { slidesPerView: 3 }
    }
  })
}

if (document.querySelector(".top-slider")) {
  new Swiper(".top-slider", {
    loop: true,
    speed: 5000,
    slidesPerView: 3,
    spaceBetween: 25,
    centeredSlides: true,
    autoplay: { delay: 0, disableOnInteraction: false },
    allowTouchMove: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      991: { slidesPerView: 3 }
    }
  })
}

if (document.querySelector(".bottom-slider")) {
  new Swiper(".bottom-slider", {
    loop: true,
    speed: 5000,
    slidesPerView: 3,
    spaceBetween: 25,
    centeredSlides: true,
    autoplay: { delay: 0, reverseDirection: true, disableOnInteraction: false },
    allowTouchMove: true,
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      991: { slidesPerView: 3 }
    }
  })
}

// ─── LOGIN HASH ───────────────────────────────────────
window.addEventListener("load", () => {
  document.querySelectorAll(".bg-video").forEach(video => {
    video.muted = true
    video.play().catch(() => {})
  })

  if (window.location.hash === "#login") {
    const lf = document.querySelector(".login-form")
    if (lf) lf.classList.add("active")
  }
})

// ─── ABOUT SWIPERS ────────────────────────────────────
if (document.querySelector(".row-left")) {
  document.querySelector(".row-left").classList.add("swiper")
  document.querySelector(".row-left").innerHTML =
    `<div class="swiper-wrapper">` +
    document.querySelector(".row-left").innerHTML +
    `</div>`

  document.querySelector(".row-right").classList.add("swiper")
  document.querySelector(".row-right").innerHTML =
    `<div class="swiper-wrapper">` +
    document.querySelector(".row-right").innerHTML +
    `</div>`

  document.querySelectorAll(".about-column").forEach(slide => {
    slide.classList.add("swiper-slide")
  })

  new Swiper(".row-left", {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 6000,
    autoplay: { delay: 0, disableOnInteraction: false },
    allowTouchMove: true
  })

  new Swiper(".row-right", {
    loop: true,
    grabCursor: true,
    slidesPerView: "auto",
    spaceBetween: 20,
    speed: 6000,
    autoplay: { delay: 0, reverseDirection: true, disableOnInteraction: false },
    allowTouchMove: true
  })
}

// ─── VIDEO POPUP ──────────────────────────────────────
if (document.querySelector(".about-column video")) {
  const videos = Array.from(document.querySelectorAll(".about-column video"))
  let currentIndex = 0
  const popup = document.getElementById("videoPopup")
  const popupVideo = document.getElementById("popupVideo")
  const closePopup = document.getElementById("closePopup")

  videos.forEach((video, index) => {
    video.addEventListener("click", (e) => {
      e.stopPropagation()
      currentIndex = index
      openPopup(video.src || video.currentSrc)
    })
  })

  function openPopup(src) {
    videos.forEach(v => v.pause())
    popupVideo.src = src
    popup.style.display = "flex"
    popupVideo.play()
  }

  let startX = 0
  popupVideo.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX })
  popupVideo.addEventListener("touchend", (e) => {
    let diff = startX - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % videos.length
      } else {
        currentIndex = (currentIndex - 1 + videos.length) % videos.length
      }
      popupVideo.pause()
      popupVideo.src = videos[currentIndex].src
      popupVideo.play()
    }
  })

  function closeVideoPopup() {
    popupVideo.pause()
    popupVideo.src = ""
    popup.style.display = "none"
    videos.forEach(v => v.play().catch(() => {}))
  }

  closePopup.addEventListener("click", closeVideoPopup)
  popup.addEventListener("click", (e) => {
    if (e.target === popup) closeVideoPopup()
  })
}

// ─── PROJECT LIGHTBOX ─────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".project-lightbox")
  if (!lightbox) return

  const closeBtn = document.querySelector(".project-lightbox-close")
  const wrapper = document.querySelector(".project-lightbox-swiper .swiper-wrapper")
  const boxes = document.querySelectorAll(".projects .box")

  let images = []

  boxes.forEach((box, index) => {
    const img = box.querySelector("img").src
    images.push(img)
    box.addEventListener("click", (e) => {
      e.preventDefault()
      openLightbox(index)
    })
  })

  images.forEach((src) => {
    const slide = document.createElement("div")
    slide.className = "swiper-slide"
    slide.innerHTML = `<img src="${src}">`
    wrapper.appendChild(slide)
  })

  const swiper = new Swiper(".project-lightbox-swiper", {
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  })

  function openLightbox(index) {
    lightbox.classList.add("active")
    swiper.update()
    swiper.slideToLoop(index, 0)
  }

  closeBtn.addEventListener("click", () => lightbox.classList.remove("active"))
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active")
  })
})

// ─── CONTACT FORM ─────────────────────────────────────
function sendEmail() {
  const name = document.querySelector("#name").value
  const email = document.querySelector("#email").value
  const phone = document.querySelector("#phone").value
  const message = document.querySelector("#message").value

  if (!name || !email || !message || !phone) {
    alert("Please fill in all required fields")
    return
  }

  emailjs.send("service_1fdsi6e", "template_2hahcb9", {
    name, email, phone, message
  })
  .then(() => console.log("Email sent!"))
  .catch((error) => console.log("EmailJS error:", error))

  fetch(`${WORKER_URL}/feedback`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, message })
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      alert("Message sent successfully!")
      document.querySelector(".form-group").reset()
    } else {
      alert("Something went wrong: " + data.error)
    }
  })
  .catch((error) => console.log("Worker error:", error))
}

// ─── SIGNUP ───────────────────────────────────────────
async function signUp() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const response = await fetch(`${WORKER_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  if (data.error) {
    alert(data.error)
  } else {
    alert(data.success)
  }
}

// ─── SIGNIN ───────────────────────────────────────────
async function signIn() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const response = await fetch(`${WORKER_URL}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  if (data.error) {
    alert(data.error)
  } else {
    alert(data.success)
    localStorage.setItem("user", JSON.stringify(data.user))
  }
}