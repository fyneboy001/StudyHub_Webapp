function updateProgress(percentage) {
  document.querySelector(".progress-bar").computedStyleMap.width =
    percentage + "%";
}

// Star liked styling
// const star = document.querySelector(".star");
// const info = document.querySelector(".info");

// let likes = 0;
// const maxRating = 5.0;

// star.addEventListener("click", () => {
//   if (likes < maxRating) {
//     likes += 0.1; // increment by 0.1 per click
//     star.classList.add("liked");

//     // Calculate percentage
//     const percentage = (likes / maxRating) * 100;

//     // Gradual background color change (lighter to more gold)
//     const colorIntensity = Math.min(100, percentage);
//     star.style.color = `hsl(45, 100%, ${50 + colorIntensity / 2}%)`;

//     // info.textContent = `${likes.toFixed(1)} likes (${Math.round(percentage)}%)`;
//     info.textContent = `${likes.toFixed(1)}`;
//   }
// });
document.querySelectorAll(".star").forEach((star) => {
  const container = star.closest(".rating"); // Wrap each star + info in a common parent
  const info = container.querySelector(".info");

  let likes = 0;
  const maxRating = 5.0;

  star.addEventListener("click", () => {
    if (likes < maxRating) {
      likes += 0.1;

      star.classList.add("liked");

      const percentage = (likes / maxRating) * 100;
      const colorIntensity = Math.min(100, percentage);
      star.style.color = `hsl(45, 100%, ${50 + colorIntensity / 2}%)`;

      info.textContent = `${likes.toFixed(1)}`;
    }
  });
});

// Kebab Menu Styling
function toggleMenu(event) {
  event.stopPropagation(); // Prevent triggering window.onclick
  const menuWrapper = event.currentTarget.closest(".menu-wrapper");
  const dropdown = menuWrapper.querySelector(".dropdown-menu");
  dropdown.classList.toggle("show");
}

// Close all menus when clicking outside
window.onclick = function (event) {
  if (!event.target.matches(".dots-button")) {
    const menus = document.getElementsByClassName("dropdown-menu");
    for (let i = 0; i < menus.length; i++) {
      menus[i].classList.remove("show");
    }
  }
};

//Hamburger Menu Styling
const hamburger = document.getElementById("hamburgerToggle");
const sideNav = document.querySelector(".SideNav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  sideNav.classList.toggle("active");
});
