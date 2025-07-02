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

// Carousel Functionality
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

// Toggle Search Input styling
// Search input toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileSearchToggle = document.getElementById("mobileSearchToggle");
  const mobileSearchContainer = document.querySelector(
    ".dashboard-search.mobile-only"
  );

  mobileSearchToggle?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileSearchContainer.classList.toggle("active");
    const input = document.getElementById("mobileSearchInput");
    if (mobileSearchContainer.classList.contains("active")) {
      input.focus();
    }
  });

  document.addEventListener("click", (e) => {
    if (!mobileSearchContainer.contains(e.target)) {
      mobileSearchContainer.classList.remove("active");
    }
  });
});

// Get user data from localStorage
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("studyhub_user"));
  const origin = localStorage.getItem("studyhub_origin");
  const welcomeMessage = document.getElementById("welcome-message");

  if (user && user.firstName) {
    welcomeMessage.textContent = `Hello, ${user.firstName}`;
  } else {
    welcomeMessage.textContent = "Hello, Guest";
  }
  if (user) {
    // Update profile name and category
    // Set full name in the profile
    document.getElementById(
      "user-name"
    ).textContent = `${user.firstName} ${user.lastName}`;

    // Capitalize and format category nicely
    const category = user.category
      ? user.category.replace("_", " ")
      : "Not set";
    document.getElementById(
      "categoryDisplay"
    ).textContent = `Category: ${capitalize(category)}`;

    // Profile image (fallback if not set)
    const profileImg = document.getElementById("user-profile-img");
    if (user.profileImage) {
      profileImg.src = user.profileImage;
    } else {
      profileImg.src = "./assets/Icons/Userprofile.png";
    }
  }
  // else {
  //   // Redirect if not logged in
  //   window.location.href = "../Loginpage.html";
  // }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //Getting user category
  // const user = JSON.parse(localStorage.getItem("studyhub_user"));

  if (user) {
    const category = user.category
      ? user.category.replace("_", " ")
      : "Not set";
    document.getElementById("categoryDisplay").textContent = `${capitalize(
      category
    )}`;
  }
});
