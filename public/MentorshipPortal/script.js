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
    maxLikes: 50, // Adjusted so 50 * 0.1 = 5.0 max rating
    likeValue: 0.1, // Each like increases rating by 0.1
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
        const fill = Math.max(0, Math.min(1, rating - i)); // fractional fill

        const starWrapper = document.createElement("div");
        starWrapper.className = "star-wrapper";

        const starBg = document.createElement("span");
        starBg.className = "star-bg";
        starBg.textContent = "★";

        const starFill = document.createElement("span");
        starFill.className = "star-fill";
        starFill.textContent = "★";
        starFill.style.width = `${fill * 100}%`; // % of star to fill

        starWrapper.appendChild(starBg);
        starWrapper.appendChild(starFill);
        container.appendChild(starWrapper);
      }
    }

    function updateDisplay() {
      const rating = Math.min(likes * config.likeValue, config.maxRating);
      renderStars(rating);
      ratingValueEl.textContent = rating.toFixed(1);
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

// Chat Section Functionality Implementation
function getTimeAgo(timestamp) {
  const now = new Date();
  const seconds = Math.floor((now - timestamp) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function updateSidebarTimes() {
  const times = document.querySelectorAll(".chat-time");
  times.forEach((span) => {
    const t = new Date(span.dataset.timestamp);
    if (!isNaN(t)) {
      span.textContent = getTimeAgo(t);
    }
  });
}

function sendMessage() {
  const input = document.getElementById("messageInput");
  const message = input.value.trim();
  if (message !== "") {
    const timestamp = new Date();

    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    messageDiv.textContent = message;

    const timeDiv = document.createElement("div");
    timeDiv.className = "timestamp";
    timeDiv.textContent = getTimeAgo(timestamp);

    messageDiv.appendChild(timeDiv);
    document.getElementById("chat-body").appendChild(messageDiv);
    input.value = "";

    const activeTime = document.querySelector(".chat-item.active .chat-time");
    if (activeTime) {
      activeTime.dataset.timestamp = timestamp.toISOString();
      updateSidebarTimes();
    }

    document.getElementById("chat-body").scrollTop =
      document.getElementById("chat-body").scrollHeight;
  }
}

function selectChat(element, name, imageUrl) {
  document
    .querySelectorAll(".chat-item")
    .forEach((item) => item.classList.remove("active"));
  element.classList.add("active");

  document.getElementById("chat-name").textContent = name;
  document.getElementById("chat-profile").src = imageUrl;
  document.getElementById("chat-body").innerHTML = "";
}

window.onload = () => {
  const now = new Date();
  document.querySelectorAll(".chat-time").forEach((span) => {
    const minutesAgo = Math.floor(Math.random() * 120); // 0 to 120 minutes ago
    const past = new Date(now - minutesAgo * 60000);
    span.dataset.timestamp = past.toISOString();
  });
  updateSidebarTimes();
  setInterval(updateSidebarTimes, 30000);

  // Send on Enter key
  document
    .getElementById("messageInput")
    .addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
};

// Toggle Search Input styling
// Search input toggle
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

// Chatbox hamburger
const hamburgerBtn = document.getElementById("hamburgerTog");
const sidebar = document.querySelector(".sidebar");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.classList.toggle("active");
  sidebar.classList.toggle("active");
});

// Optional: close sidebar if you click outside it
document.addEventListener("click", (e) => {
  if (
    !sidebar.contains(e.target) &&
    !hamburgerBtn.contains(e.target) &&
    sidebar.classList.contains("active")
  ) {
    sidebar.classList.remove("active");
    hamburgerBtn.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("studyhub_current_user_email");
  const origin = localStorage.getItem("studyhub_origin");
  const allUsers = JSON.parse(localStorage.getItem("studyhub_users")) || [];

  const user = allUsers.find((u) => u.email === email);

  const welcomeMessage = document.getElementById("welcome-message");

  if (user) {
    // Set welcome message
    const greeting = origin === "signup" ? "Welcome" : "Welcome back";
    welcomeMessage.textContent = `${greeting}, ${user.firstName}`;

    // Set full name in the profile
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) {
      userNameEl.textContent = `${user.firstName} ${user.lastName}`;
    }

    // Capitalize and format category
    const category = user.grade || user.category || "Student";
    const categoryEl = document.getElementById("categoryDisplay");
    if (categoryEl) {
      const formatted = capitalize(category.replace("_", " "));
      categoryEl.textContent = `${formatted}`;
    }

    // Profile image
    const profileImg = document.getElementById("user-profile-img");
    if (profileImg) {
      profileImg.src = user.profileImage || "./assets/Icons/Userprofile.png";
    }
  } else {
    welcomeMessage.textContent = "Hello, Guest";
    // Optional: redirect if user not found
    // window.location.href = "../Loginpage.html";
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
