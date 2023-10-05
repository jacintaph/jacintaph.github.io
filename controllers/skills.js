const tabsContainer = document.querySelector(".about__tabs-container");
const tabs = document.querySelectorAll(".about__tab");
const tabContent = document.querySelectorAll(".about__content");

/* ------------- SKILLS TABS --------------------*/
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".about__tab");
  if (!clicked) return; // guard clause
  // Reset tab active tag
  tabs.forEach((tab) => tab.classList.remove("about__tab--active"));
  // Reset content active tag
  tabContent.forEach((content) =>
    content.classList.remove("about__content--active")
  );
  //Add active tag to clicked tab
  clicked.classList.add("about__tab--active");
  document
    .querySelector(`.about__content--${clicked.dataset.tab}`)
    .classList.add("about__content--active");
});


/* -------------- UP-ARROW SCROLL ------------------- */
const btnScrollUp = document.querySelector(".up__arrow");
btnScrollUp.addEventListener("click", function () {
  const homeCoords = home.getBoundingClientRect();
  home.scrollIntoView({ behavior: "smooth" });
});
