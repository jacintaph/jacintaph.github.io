"use strict";

const tabsContainer = document.querySelector(".about__tabs-container");
const tabs = document.querySelectorAll(".about__tab");
const tabContent = document.querySelectorAll(".about__content");
const btnScrollDown = document.querySelector(".down__arrow");

const nav = document.querySelector(".nav__bar");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav__links");

const allSections = document.querySelectorAll(".section");
const socialIcons = document.querySelectorAll(".social__icons");

/* --------- PROJECT WINDOWS -------------- */
const btnContainer = document.querySelector(".wrapper");
const projectWindows = document.querySelectorAll(".project__popup");
const popUps = document.querySelector(".project__popups");
const popup = document.querySelectorAll(".popup");
const overlay = document.querySelector(".overlay");
const projectGrid = document.querySelector(".project__grid");

/* ------------ SLIDES ------------------ */
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

/* --------- RESET SCROLL ON REFRESH ------- */
history.scrollRestoration = "manual";


/* -------------- UP-ARROW SCROLL ------------------- */
const btnScrollUp = document.querySelector(".up__arrow");
btnScrollUp.addEventListener("click", function () {
  const homeCoords = home.getBoundingClientRect();
  home.scrollIntoView({ behavior: "smooth" });
});


/* ------------ TOGGLE PROJECT WINDOWS ----------- */
const toggleWindow = function (num = null) {
  overlay.classList.toggle("hidden");
  if (!num) return;
  const popup = document.querySelector(`.popup--${num}`);
  popup.classList.toggle("hidden");
};

/* ------------ PROJECT: EVENT LISTENERS -------------- */
projectGrid.addEventListener("click", function (e) {
  const projectTile = e.target.closest(".project");
  const title = e.target.closest(".text__title");
  if (!projectTile && !title) return;
  toggleWindow(projectTile ? projectTile.dataset.tab : title.dataset.tab);
});

overlay.addEventListener("click", function () {
  popup.forEach((p) => {
    if (!p.classList.contains("hidden")) {
      toggleWindow(p.dataset.tab); // only toggle active popup
      return false; // end forEach
    }
  });
});

/* ---------- PROJECT: CLOSE BUTTON CLICK ---------------- */
btnContainer.addEventListener("click", function (e) {
  const btn = e.target.nodeName === "BUTTON";
  if (!btn) return;
  if (!e.target.classList.contains("btn")) return;
  const popUp = e.target.closest(".popup");
  toggleWindow(popUp.dataset.tab);
});


/* ------------- REVEAL SECTIONS ON SCROLL ------------ */
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  entry.target.classList.remove("section--scroll");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

/* ------------- HIDE SECTIONS -------------- */
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
  section.classList.add("section--scroll");
});

/* --------------- SLIDER ---------------- */
const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0; // return to beginning
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Initialisation
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  };

  init();
  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  ////////////////////////////////////////////////////////////////
  // Slider --> with arrow keys

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });

  // Dot Container
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset; // destructuring
      goToSlide(slide);
      activateDot(slide);
    }
  });
};

slider();
