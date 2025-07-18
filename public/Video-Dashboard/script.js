// 🔹 Hamburger Menu Styling
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

// 🔹 Lesson Module State Handling
const navEntries = performance.getEntriesByType("navigation");
const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";

const contentTitles = [
  [
    "1. What is a Cell?",
    "2. Types of Cell",
    "3. Cell Theory",
    "4. Structures of Cell Organelles",
    "5. Functions of Cell Organelles",
    "6. Plant Cells",
    "7. Animal Cells",
    "8. Difference between plant and Animal Cells",
  ],
  ["Getting Started", "Deep Dive", "Case Study", "Live Demo", "Summary"],
  ["Warm-up", "Theory", "Examples", "Challenge", "Wrap-up"],
  ["Basics", "Intermediate", "Advanced", "Real-world Apps", "Assessment"],
];

// On full reload, preserve only currentLesson
if (navType === "reload") {
  if (sessionStorage.getItem("comments")) {
    sessionStorage.removeItem("comments");
  }
}

const totalLessons = contentTitles.length;
let currentLesson = 0;

function isContentCompleted(lesson, content) {
  return localStorage.getItem(`lesson-${lesson}-content-${content}`) === "true";
}

function renderLessons() {
  const container = document.getElementById("lessons");
  container.innerHTML = "";

  for (let i = 0; i < totalLessons; i++) {
    const lessonDiv = document.createElement("div");
    lessonDiv.className = "lesson" + (i === currentLesson ? " active" : "");

    const contents = contentTitles[i];
    for (let j = 0; j < contents.length; j++) {
      const isCompleted = isContentCompleted(i, j);
      const contentDiv = document.createElement("div");
      contentDiv.className = "content";
      contentDiv.onclick = () => {
        window.location.href = `lesson${i}/content-${i}-${j}.html`;
      };

      if (isCompleted) {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.disabled = true;
        checkbox.className = "checkbox";
        contentDiv.appendChild(checkbox);
      } else {
        const circle = document.createElement("div");
        circle.className = "circle";
        contentDiv.appendChild(circle);
      }

      const label = document.createElement("span");
      label.textContent = contents[j];
      contentDiv.appendChild(label);

      lessonDiv.appendChild(contentDiv);
    }

    container.appendChild(lessonDiv);
  }
}

function nextLesson() {
  if (currentLesson < totalLessons - 1) {
    currentLesson++;
    localStorage.setItem("currentLesson", currentLesson);
    renderLessons();
  }
}

function prevLesson() {
  if (currentLesson > 0) {
    currentLesson--;
    localStorage.setItem("currentLesson", currentLesson);
    renderLessons();
  }
}

function initializeLessonPage() {
  const storedLesson = localStorage.getItem("currentLesson");
  currentLesson = storedLesson !== null ? parseInt(storedLesson, 10) : 0;
  renderLessons();
}

// 🔹 On DOM load, get and display logged-in or signed-up user details
document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("studyhub_current_user_email");
  const origin = localStorage.getItem("studyhub_origin"); // signup or login
  const users = JSON.parse(localStorage.getItem("studyhub_users")) || [];

  // Find user by email
  const user = users.find((u) => u.email === email);

  if (!user) {
    console.warn("User not found. Redirecting to login...");
    window.location.href = "../Loginpage.html";
    return;
  }

  const greeting = origin === "signup" ? "Welcome" : "Welcome back";

  const realName = `${user.firstName} ${user.lastName}`;
  const profileImage =
    user.profileImage?.trim() || "./assets/Icons/Userprofile.png";
  const category = capitalize(user.grade || user.category || "Student");

  // Sidebar
  const nameEl = document.getElementById("user-name");
  const categoryEl = document.getElementById("categoryDisplay");
  const profileImgEl = document.getElementById("user-profile-img");
  if (nameEl) nameEl.textContent = realName;
  if (categoryEl) categoryEl.textContent = category.replace("_", " ");
  if (profileImgEl) profileImgEl.src = profileImage;

  // Comment Box Display
  const userRealNameEl = document.getElementById("userRealName");
  const userProfileImgEl = document.getElementById("userProfileImage");
  if (userRealNameEl) userRealNameEl.textContent = realName;
  if (userProfileImgEl) userProfileImgEl.src = profileImage;

  // Set up session for commenting system
  const currentUser = {
    username: realName.toLowerCase().replace(/\s+/g, "_"),
    realName,
    profileImage,
  };
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Set global vars for later access
  window.USER_NAME = realName;
  window.USER_IMAGE = profileImage;
  window.USER_CLASS = category;

  displayComments();
  initializeLessonPage();

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});

// 🔹 Build Comment Element (including replies)
function createCommentElement(comment, parentId = null) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
    <div class="profile">
      <img src="${comment.profileImage}" alt="User profile image" />
      <strong>${comment.realName}</strong> <small>${comment.timestamp}</small>
    </div>
    <p>${comment.text}</p>
    <div style="display: flex; gap: 10px; align-items: center; margin-top: 8px;">
      <button onclick="showReplyInput(${comment.id}, ${parentId})">Reply</button>
      <button onclick="likeComment(${comment.id}, ${parentId})">
        <img src="./assets/Icons/thumbsup.png" alt="Like" style="width: 16px; height: 16px;" />
        <span id="like-${comment.id}">${comment.likes}</span>
      </button>
    </div>
    <div id="reply-input-${comment.id}" style="margin-top: 10px;"></div>
  `;

  if (comment.replies && comment.replies.length > 0) {
    const repliesDiv = document.createElement("div");
    repliesDiv.style.marginLeft = "2rem";
    comment.replies.forEach((reply) => {
      repliesDiv.appendChild(createCommentElement(reply, comment.id));
    });
    div.appendChild(repliesDiv);
  }

  return div;
}

// 🔹 Like Comment or Reply
function likeComment(id, parentId = null) {
  let comments = JSON.parse(sessionStorage.getItem("comments")) || [];

  if (parentId) {
    const parent = comments.find((c) => c.id === parentId);
    const reply = parent.replies.find((r) => r.id === id);
    reply.likes++;
  } else {
    const comment = comments.find((c) => c.id === id);
    comment.likes++;
  }

  sessionStorage.setItem("comments", JSON.stringify(comments));
  displayComments();
}

// 🔹 Show Reply Input Box
function showReplyInput(id, parentId = null) {
  const container = document.getElementById(`reply-input-${id}`);
  container.innerHTML = `
    <textarea id="reply-text-${id}" rows="2" placeholder="Write a reply..." style="width: 100%; margin-top: 5px;"></textarea>
    <button onclick="postReply(${id}, ${parentId})" style="margin-top: 5px;">Post Reply</button>
  `;
}

// 🔹 Post a Reply
function postReply(id, parentId = null) {
  const textArea = document.getElementById(`reply-text-${id}`);
  const replyText = textArea.value.trim();
  if (!replyText) return;

  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  const reply = {
    id: Date.now(),
    realName: user.realName,
    profileImage: user.profileImage,
    text: replyText,
    timestamp: new Date().toLocaleString(),
    likes: 0,
    replies: [],
  };

  let comments = JSON.parse(sessionStorage.getItem("comments")) || [];
  if (parentId) {
    const parent = comments.find((c) => c.id === parentId);
    const replyTo = parent.replies.find((r) => r.id === id);
    replyTo.replies = replyTo.replies || [];
    replyTo.replies.unshift(reply);
  } else {
    const comment = comments.find((c) => c.id === id);
    comment.replies = comment.replies || [];
    comment.replies.unshift(reply);
  }

  sessionStorage.setItem("comments", JSON.stringify(comments));
  displayComments();
}

// 🔹 Comment Collapse/Expand Toggle
const toggleBtn = document.getElementById("toggleButton");
const commentContent = document.getElementById("commentContent");
const toggleIcon = document.getElementById("toggleIcon");
const toggleText = toggleBtn.querySelector(".text");

toggleBtn.addEventListener("click", () => {
  const isCollapsed = commentContent.classList.toggle("collapsed");
  commentContent.classList.toggle("expanded", !isCollapsed);

  if (isCollapsed) {
    toggleIcon.innerHTML = `<div class="bar"></div><div class="bar"></div>`;
    toggleText.textContent = "Open";
    toggleBtn.setAttribute("aria-expanded", "false");
  } else {
    toggleIcon.innerHTML = `<div style="font-size: 1.5rem;">ⓧ</div>`;
    toggleText.textContent = "Close";
    toggleBtn.setAttribute("aria-expanded", "true");
  }
});

// 🔹 Mobile Search Toggle
const mobileSearchToggle = document.getElementById("mobileSearchToggle");
const mobileSearchContainer = document.querySelector(
  ".dashboard-search.mobile-only"
);

mobileSearchToggle?.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileSearchContainer.classList.toggle("active");
  const input = document.getElementById("mobileSearchInput");
  if (mobileSearchContainer.classList.contains("active")) input.focus();
});

document.addEventListener("click", (e) => {
  if (!mobileSearchContainer.contains(e.target)) {
    mobileSearchContainer.classList.remove("active");
  }
});
