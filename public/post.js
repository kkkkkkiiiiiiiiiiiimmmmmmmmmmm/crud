// const whenChatChanged = (event) => {
//   console.log(event);
// };
// const whenChatSubmitted = (event) => {
//   event.preventDefault();
// };
// const postForm = document.querySelector(".postForm");

// chatInput.addEventListener("input", whenChatChanged);
// chatForm.addEventListener("submit", whenChatSubmitted);
const deleteButton = document.querySelector(".deleteButton");

const whenDeleteButtonClicked = () => {
  alert("are you sure?");
};

deleteButton.addEventListener("click", whenDeleteButtonClicked);
