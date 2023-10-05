/* -------------- UP-ARROW SCROLL ------------------- */
const btnScrollUp = document.querySelector(".up__arrow");
btnScrollUp.addEventListener("click", function () {
  const homeCoords = home.getBoundingClientRect();
  home.scrollIntoView({ behavior: "smooth" });
});