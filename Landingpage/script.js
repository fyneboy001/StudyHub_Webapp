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
