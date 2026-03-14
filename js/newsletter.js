const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const openBtn = document.querySelector("#open-newsletter");
const closeBtn = document.querySelector(".close-button");
const form = document.querySelector("#newsletter-form");
const errorMessage = document.querySelector("#form-error");


function openModal() {
  modal.classList.add("open");
  modalContent.classList.add("open");
  modal.classList.remove("close-animation"); 
  modalContent.classList.remove("close-animation"); 
  modal.setAttribute("aria-hidden", "false");
  modalContent.setAttribute("aria-hidden", "false");
}


function closeModal() {
  modal.classList.add("close-animation");
  modalContent.classList.add("close-animation");
  modal.addEventListener("animationend", handleClose, { once: true });
  modalContent.addEventListener("animationend", handleClose, { once: true });
}


function handleClose() {
  modal.classList.remove("open");
  modalContent.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalContent.setAttribute("aria-hidden", "true");
  modal.classList.remove("close-animation");
  modalContent.classList.remove("close-animation");
}


openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal();
  }
});


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.querySelector("#name").value.trim();
  const email = document.querySelector("#email").value.trim();

  if (name === "" || email === "") {
    errorMessage.textContent = "Please fill out all fields.";
    return;
  }

  errorMessage.textContent = "";

  const user = { name, email };
  localStorage.setItem("newsletterUser", JSON.stringify(user));

  closeModal(); 
});