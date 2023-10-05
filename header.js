// footer.js
document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("home");
    fetch("header.html")
      .then((response) => response.text())
      .then((data) => {
        headerContainer.innerHTML = data;
      });
  });

