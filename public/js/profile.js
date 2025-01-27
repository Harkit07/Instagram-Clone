const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const followContainer = document.querySelector(".follower-container");
const followingContainer = document.querySelector(".following-container");
const mainContainer = document.querySelector(".main-container");
const closBtn = document.querySelector(".close-btn");

mainContainer.addEventListener("click", (e) => {
  e.stopPropagation();
});
closBtn.addEventListener("click", () => {
  followContainer.classList.add("hide");
  followingContainer.classList.add("hide");
});
following.addEventListener("click", () => {
  followingContainer.classList.remove("hide");
});
followers.addEventListener("click", () => {
  followContainer.classList.remove("hide");
});
followContainer.addEventListener("click", () => {
  followContainer.classList.add("hide");
});
followingContainer.addEventListener("click", () => {
  followingContainer.classList.add("hide");
});
