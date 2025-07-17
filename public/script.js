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

// The Accordion Styling
function toggleFAQ(element) {
  const isOpen = element.classList.contains("open");

  if (isOpen) {
    element.classList.remove("open");
    element.classList.add("closed");
    element.querySelector(".toggle-sign").textContent = "+";
  } else {
    element.classList.remove("closed");
    element.classList.add("open");
    element.querySelector(".toggle-sign").textContent = "×";
  }
}

// Subject link Toggle
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".Subject-links li");
  const contents = document.querySelectorAll(".content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      tabs.forEach((t) => t.classList.remove("active"));
      // Hide all content blocks
      contents.forEach((c) => c.classList.add("hidden"));

      // Activate the clicked tab
      tab.classList.add("active");
      const targetId = tab.getAttribute("data-target");
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.remove("hidden");
      }
    });
  });
});
