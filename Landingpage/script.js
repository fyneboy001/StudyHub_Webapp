// hamburger styling
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-Menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// //Login and Getstarted functions
// function goTologin() {
//   window.location.href = "Loginpage.html";
// }
function showContent(id) {
  const contents = document.querySelectorAll(".content");
  contents.forEach((content) => content.classList.add("hidden"));

  document.getElementById(id).classList.remove("hidden");
}

function seeMore(articleTitle) {
  window.location.href = `./${articleTitle}`;
}
showContent("content1");

// Carousel Styling
// let current = 0;
// const slides = document.querySelectorAll(".slide");

// function showSlide(index) {
//   slides.forEach((slide, i) => {
//     slide.classList.toggle("active", i === index);
//   });
// }

// function nextSlide() {
//   current = (current + 1) % slides.length;
//   showSlide(current);
// }

// function prevSlide() {
//   current = (current - 1 + slides.length) % slides.length;
//   showSlide(current);
// }
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
