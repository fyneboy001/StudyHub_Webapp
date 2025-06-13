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

// Post Section Styling
const profileImage = document.querySelector("#ProfileImage");
const userName = document.querySelector("#Username");
const userIdentity = document.querySelector("#useridentity");

const USER_NAME = userName.textContent.trim(); // "Emily Ikpe"
const USER_IMAGE = profileImage.getAttribute("src"); // "../StudentDashboard/assets/Icons/Userprofile.png"
const USER_CLASS = userIdentity.textContent.trim(); // "Student"

function createPost() {
  const text = document.getElementById("postText").value.trim();
  if (!text) return;

  const container = document.getElementById("postFeed");
  const post = document.createElement("div");
  post.className = "post-item";
  const now = new Date();
  post.innerHTML = renderPost(USER_NAME, USER_IMAGE, USER_CLASS, text, now);

  container.prepend(post);
  document.getElementById("postText").value = "";
}

function renderPost(name, img, userClass, message, time) {
  const timeText = formatTime(time);
  return `
        <div class="post-top">
          <div class="post-meta">
            <img src="${img}" alt="User" />
            <div class="meta-info">
              <div class="meta-header">
                <span class="name">${name}</span>
                <span class="time">• ${timeText}</span>
              </div>
              <span class="class">${userClass}</span>
            </div>
          </div>
          <div class="post-tags">
            <span class="tag">Chemistry</span>
            <span class="tag">Feedback</span>
            <span class="kebab">⋮</span>
          </div>
        </div>
        <div class="post-message">${message}</div>
        <div class="post-actions">
          <span onclick="likePost(this)"><img src="./assets/icons/like.png" alt="Like Icon" /> <span class="like-count">0</span></span>
          <span onclick="toggleCommentBox(this)"><img src="./assets/icons/comment.png" alt="Comment Icon" /> <span class="comment-count">0</span></span>
          <span><img src="./assets/icons/share.png" alt="Share Icon" /></span>
        </div>
        <div class="comment-box hidden">
          <div class="create-header">
            <img src="${USER_IMAGE}" alt="User">
            <textarea class="comment-text" placeholder="Write a comment..."></textarea>
          </div>
          <div class="footer-bar">
            <div></div>
            <button class="post-button" onclick="submitComment(this)">Comment</button>
          </div>
        </div>
        <div class="nested-comments"></div>
      `;
}

function toggleCommentBox(el) {
  const parent = el.closest(".post-item, .comment-item");
  const box = parent.querySelector(".comment-box");
  box.classList.toggle("hidden");
}

function likePost(el) {
  const count = el.querySelector(".like-count");
  count.textContent = parseInt(count.textContent) + 1;
}

function submitComment(button) {
  const commentBox = button.closest(".comment-box");
  const textarea = commentBox.querySelector(".comment-text");
  const text = textarea.value.trim();
  if (!text) return;

  const parent = button.closest(".post-item, .comment-item");
  const container = parent.querySelector(".nested-comments");
  const comment = document.createElement("div");
  comment.className = "comment-item";
  comment.innerHTML = renderPost(
    USER_NAME,
    USER_IMAGE,
    USER_CLASS,
    text,
    new Date()
  );

  container.appendChild(comment);

  const countEl = parent.querySelector(".comment-count");
  countEl.textContent = parseInt(countEl.textContent) + 1;

  textarea.value = "";
  commentBox.classList.add("hidden");
}

function formatTime(date) {
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day ago`;
  if (diff < 2419200) return `${Math.floor(diff / 604800)} week ago`;
  return date.toDateString();
}

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
