// Hamburger Menu Styling
const hamburger = document.getElementById("hamburgerToggle");
const sideNav = document.querySelector(".SideNav");

hamburger?.addEventListener("click", () => {
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
    `<div class="carousel-nav">${buttonsHTML.join("")}</div>`
  );

  const buttons = carousel.querySelectorAll(".carousel-button");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      items.forEach((item) => item.classList.remove("carousel-item-selected"));
      buttons.forEach((btn) =>
        btn.classList.remove("carousel-button-selected")
      );

      items[index].classList.add("carousel-item-selected");
      button.classList.add("carousel-button-selected");
    });
  });

  items[0].classList.add("carousel-item-selected");
  buttons[0].classList.add("carousel-button-selected");
});

// Kebab Menu Styling
function toggleMenu(event) {
  event.stopPropagation();
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

// Toggle Search Input (Mobile)
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

// ============================
// ✅ USER PROFILE DATA SECTION
// ============================
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("studyhub_current_user_email");
  const origin = localStorage.getItem("studyhub_origin");
  const users = JSON.parse(localStorage.getItem("studyhub_users")) || [];

  const user = users.find((u) => u.email === email);

  if (user) {
    const greeting = origin === "signup" ? "Welcome" : "Welcome back";

    const welcomeMessage = document.getElementById("welcome-message");
    welcomeMessage.textContent = `${greeting}, ${user.firstName}!`;

    document.getElementById(
      "user-name"
    ).textContent = `${user.firstName} ${user.lastName}`;

    const category = user.category || user.grade || "Not set";
    document.getElementById("categoryDisplay").textContent = `${capitalize(
      category.replace("_", " ")
    )}`;

    const profileImg = document.getElementById("user-profile-img");
    profileImg.src =
      user.profileImage?.trim() || "./assets/Icons/Userprofile.png";

    // Global variables (if used elsewhere)
    window.USER_NAME = `${user.firstName} ${user.lastName}`;
    window.USER_IMAGE =
      user.profileImage?.trim() || "./assets/Icons/Userprofile.png";
    window.USER_CLASS = capitalize(user.category || user.grade || "Student");
  } else {
    // Redirect to login if no user found
    window.location.href = "../Loginpage.html";
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

// ===========================
// Subject Pagination Buttons
// ===========================
const pageButtons = document.querySelectorAll(".page-button");
const subjectPages = document.querySelectorAll(".subject-page");
const moreButton = document.querySelector(".more-button");

function switchToPage(target) {
  subjectPages.forEach((page) => {
    page.classList.remove("active-page");
    if (page.dataset.page === target) {
      page.classList.add("active-page");
    }
  });

  pageButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.target === target) {
      btn.classList.add("active");
    }
  });
}

pageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.target;
    switchToPage(target);
  });
});

// Default to page 1
switchToPage("1");

// Update more button count
const totalPages = subjectPages.length;
moreButton.textContent = `+${totalPages}`;
