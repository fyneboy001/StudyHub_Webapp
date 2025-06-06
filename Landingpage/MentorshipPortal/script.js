//Hamburger Menu Styling
const hamburger = document.getElementById("hamburgerToggle");
const sideNav = document.querySelector(".SideNav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sideNav.classList.toggle("active");
});

document.querySelectorAll(".Nav-links").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sideNav.classList.remove("active");
  })
);

// Carousel Styling
document.querySelectorAll(".carousel").forEach((carousel) => {
  const items = carousel.querySelectorAll(".carousel-item");
  const buttonsHTML = Array.from(items, () => {
    return `<span class="carousel-button"></span>`;
  });

  carousel.insertAdjacentHTML(
    "beforeend",
    `
    <div class="carousel-nav">
    ${buttonsHTML.join("")}
    </div>`
  );

  const buttons = carousel.querySelectorAll(".carousel-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Unselect all items and buttons
      items.forEach((item) => item.classList.remove("carousel-item-selected"));
      buttons.forEach((btn) =>
        btn.classList.remove("carousel-button-selected")
      );

      // Select the clicked one
      items[index].classList.add("carousel-item-selected");
      button.classList.add("carousel-button-selected");
    });
  });

  // Set default selected item and button
  items[0].classList.add("carousel-item-selected");
  buttons[0].classList.add("carousel-button-selected");
});

// Star rating styling
(function () {
  const config = {
    maxLikes: 500,
    likeValue: 0.01,
    maxRating: 5,
    starCount: 5,
  };

  const containers = document.querySelectorAll(".rating-container");
  const values = document.querySelectorAll(".rating-value");

  containers.forEach((container, index) => {
    let likes = 0;

    const ratingValueEl = values[index];

    function renderStars(rating) {
      container.innerHTML = "";
      for (let i = 0; i < config.starCount; i++) {
        const fill = Math.max(0, Math.min(1, rating - i));

        const starWrapper = document.createElement("div");
        starWrapper.className = "star-wrapper";

        const starBg = document.createElement("span");
        starBg.className = "star-bg";
        starBg.textContent = "★";

        const starFill = document.createElement("span");
        starFill.className = "star-fill";
        starFill.textContent = "★";
        starFill.style.width = `${fill * 100}%`;

        starWrapper.appendChild(starBg);
        starWrapper.appendChild(starFill);
        container.appendChild(starWrapper);
      }
    }

    function updateDisplay() {
      const rating = Math.min(likes * config.likeValue, config.maxRating);
      renderStars(rating);
      ratingValueEl.textContent = rating.toFixed(2);
    }

    container.addEventListener("click", () => {
      if (likes < config.maxLikes) {
        likes++;
        updateDisplay();
      }
    });

    updateDisplay();
  });
})();
