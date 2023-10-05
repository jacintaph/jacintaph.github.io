"use strict";

const btnScrollDown = document.querySelector(".down__arrow");
const btnScrollUp = document.querySelector(".up__arrow");
const nav = document.querySelector(".nav__bar");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav__links");

const section1 = document.querySelector("#about");
const section3 = document.querySelector("#contact");
const home = document.querySelector("#home");
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

var menuoverlay = document.getElementById("nav__links");

/* --------- RESET SCROLL ON REFRESH ------- */
history.scrollRestoration = "manual";

/* --------- Nav Bar Responsive ------------ */

/* --------- DOWN-ARROW SCROLL --------------- */
btnScrollDown.addEventListener("click", function () {
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

/* -------------- UP-ARROW SCROLL ------------------- */
btnScrollUp.addEventListener("click", function () {
  const homeCoords = home.getBoundingClientRect();
  home.scrollIntoView({ behavior: "smooth" });
});

// /* ------------- ABOUT TABS --------------------*/
// tabsContainer.addEventListener("click", function (e) {
//   const clicked = e.target.closest(".about__tab");
//   if (!clicked) return; // guard clause
//   // Reset tab active tag
//   tabs.forEach((tab) => tab.classList.remove("about__tab--active"));
//   // Reset content active tag
//   tabContent.forEach((content) =>
//     content.classList.remove("about__content--active")
//   );
//   //Add active tag to clicked tab
//   clicked.classList.add("about__tab--active");
//   document
//     .querySelector(`.about__content--${clicked.dataset.tab}`)
//     .classList.add("about__content--active");
// });

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

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamburger.addEventListener("click", toggleMenu);

menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});
