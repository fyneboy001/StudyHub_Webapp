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

// Lesson Module checkbox functionality styling
// Clear all progress except currentLesson if reloaded
const navEntries = performance.getEntriesByType("navigation");
const navType = navEntries.length > 0 ? navEntries[0].type : "navigate";

// Clear storage on full reload, but keep currentLesson
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
  ], // Lesson 1
  ["Getting Started", "Deep Dive", "Case Study", "Live Demo", "Summary"], // Lesson 2
  ["Warm-up", "Theory", "Examples", "Challenge", "Wrap-up"], // Lesson 3
  ["Basics", "Intermediate", "Advanced", "Real-world Apps", "Assessment"], // Lesson 4
];

if (navType === "reload") {
  const current = localStorage.getItem("currentLesson");
  localStorage.clear();
  if (current !== null) {
    localStorage.setItem("currentLesson", current);
  }
}

const totalLessons = contentTitles.length;
// const contentsPerLesson = 5;
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

    // Optional: Remove lesson headers
    // const heading = document.createElement("h2");
    // heading.textContent = `Lesson ${i + 1}`;
    // lessonDiv.appendChild(heading);

    const contents = contentTitles[i]; // Get dynamic list of content titles
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

// Helper to initialize the page with proper lesson and content states
function initializeLessonPage() {
  const storedLesson = localStorage.getItem("currentLesson");
  currentLesson = storedLesson !== null ? parseInt(storedLesson, 10) : 0;
  renderLessons();
}

// Handle full load and cached back/forward navigation
window.addEventListener("load", initializeLessonPage);
window.addEventListener("pageshow", initializeLessonPage);

// Comment Section Functionality Styling
// Simulated logged-in user
const currentUser = {
  username: "derin_audu",
  realName: "Derin Audu",
  profileImage: "../StudentDashboard/assets/Icons/Userprofile.png",
};

sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

window.onload = function () {
  const user = JSON.parse(sessionStorage.getItem("currentUser"));
  document.getElementById("userRealName").textContent = user.realName;
  document.getElementById("userProfileImage").src = user.profileImage;
  displayComments();
};

function postComment() {
  const commentText = document.getElementById("commentText").value.trim();
  if (!commentText) return;

  const user = JSON.parse(sessionStorage.getItem("currentUser"));

  const comment = {
    id: Date.now(),
    realName: user.realName,
    profileImage: user.profileImage,
    text: commentText,
    timestamp: new Date().toLocaleString(),
    likes: 0,
    replies: [],
  };

  let comments = JSON.parse(sessionStorage.getItem("comments")) || [];
  comments.unshift(comment);
  sessionStorage.setItem("comments", JSON.stringify(comments));

  document.getElementById("commentText").value = "";
  displayComments();
}

function displayComments() {
  const container = document.getElementById("commentsContainer");
  container.innerHTML = "";
  const comments = JSON.parse(sessionStorage.getItem("comments")) || [];

  comments.forEach((comment) => {
    const div = createCommentElement(comment);
    container.appendChild(div);
  });
}

function createCommentElement(comment, parentId = null) {
  const div = document.createElement("div");
  div.className = "comment";
  div.innerHTML = `
      <div class="profile">
        <img src="${comment.profileImage}" alt="User profile photo for ${comment.realName}, smiling and facing forward, in a digital classroom environment" />
        <strong>${comment.realName}</strong> <small>${comment.timestamp}</small>
      </div>
      <p>${comment.text}</p>
      <div style="display: flex; gap: 10px; align-items: center; margin-top: 8px;">
        <button onclick="showReplyInput(${comment.id}, ${parentId})" style="background: transparent; border: none; outline: none; cursor: pointer;">Reply</button>
        <button onclick="likeComment(${comment.id}, ${parentId})" style="background: transparent; border: none; outline: none; cursor: pointer;">
          <img src="./assets/Icons/thumbsup.png" alt="Thumbs up icon for liking this comment" style="width: 16px; height: 16px; vertical-align: middle;" />
          <span id="like-${comment.id}">${comment.likes}</span>
        </button>
      </div>
      <div id="reply-input-${comment.id}" style="margin-top: 10px;"></div>
    `;

  // Render replies
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

function showReplyInput(id, parentId = null) {
  const container = document.getElementById(`reply-input-${id}`);
  container.innerHTML = `
      <textarea id="reply-text-${id}" rows="2" placeholder="Write a reply..." style="width: 100%; margin-top: 5px;"></textarea>
      <button onclick="postReply(${id}, ${parentId})" style="margin-top: 5px; background: #1A808D; color: #F0FBFF; height: 30px; width: 80px; border-radius: 8px; border: none; outline: none;">Post Reply</button>
    `;
}

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
  const comment = comments.find((c) => c.id === id || c.id === parentId);
  if (parentId) {
    const parent = comments.find((c) => c.id === parentId);
    const replyTo = parent.replies.find((r) => r.id === id);
    replyTo.replies = replyTo.replies || [];
    replyTo.replies.unshift(reply);
  } else {
    comment.replies = comment.replies || [];
    comment.replies.unshift(reply);
  }

  sessionStorage.setItem("comments", JSON.stringify(comments));
  displayComments();
}

const toggleBtn = document.getElementById("toggleButton");
const commentContent = document.getElementById("commentContent");
const toggleIcon = document.getElementById("toggleIcon");
const toggleText = toggleBtn.querySelector(".text");

toggleBtn.addEventListener("click", () => {
  const isCollapsed = commentContent.classList.toggle("collapsed");
  commentContent.classList.toggle("expanded", !isCollapsed);

  if (isCollapsed) {
    toggleIcon.innerHTML = `
        <div class="bar"></div>
        <div class="bar"></div>
      `;
    toggleText.textContent = "Open";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open comment section");
  } else {
    toggleIcon.innerHTML = `<div style="font-size: 1.5rem;">ⓧ</div>`;
    toggleText.textContent = "Close";
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close comment section");
  }
});
