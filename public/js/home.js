let infos = document.querySelectorAll(".info");
let overlay = document.querySelector(".overlay");
let cancel = document.querySelector(".cancel");
let likes = document.querySelectorAll(".like");
let postComment = document.querySelector(".comment-post-box");
let actionItem = document.querySelectorAll(".action-item");

for (let item of actionItem) {
  item.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

for (info of infos) {
  info.addEventListener("click", (e) => {
    e.stopPropagation();
    overlay.classList.remove("hide");
  });
}
overlay.addEventListener("click", () => {
  overlay.classList.add("hide");
});
cancel.addEventListener("click", (e) => {
  e.stopPropagation();
  overlay.classList.add("hide");
});

const scrollContainer = document.getElementById("story-section");
const scrollLeftButton = document.getElementById("scroll-left");
const scrollRightButton = document.getElementById("scroll-right");

scrollLeftButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: -200,
    behavior: "smooth",
  });
});

scrollRightButton.addEventListener("click", () => {
  scrollContainer.scrollBy({
    left: 200,
    behavior: "smooth",
  });
});
