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

if (navType === "reload") {
  const current = localStorage.getItem("currentLesson");
  localStorage.clear();
  if (current !== null) {
    localStorage.setItem("currentLesson", current);
  }
}

const totalLessons = 4;
const contentsPerLesson = 5;
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

    const heading = document.createElement("h2");
    heading.textContent = `Lesson ${i + 1}`;
    lessonDiv.appendChild(heading);

    for (let j = 0; j < contentsPerLesson; j++) {
      const isCompleted = isContentCompleted(i, j);

      const contentDiv = document.createElement("div");
      contentDiv.className = "content";
      contentDiv.onclick = () => {
        window.location.href = `content-${i}-${j}.html`;
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
      label.textContent = `Content ${j + 1}`;
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

window.onload = () => {
  const storedLesson = localStorage.getItem("currentLesson");
  if (storedLesson !== null) {
    currentLesson = parseInt(storedLesson, 10);
  } else {
    currentLesson = 0;
  }
  renderLessons();
};
