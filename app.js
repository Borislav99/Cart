/* --- Filter Code --- */
//buttons function
(function () {
  let btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      let filter = event.target.dataset.filter;
      let storeItems = document.querySelectorAll(".store-item");
      storeItems.forEach((item) => {
        if (filter === "all") {
          item.style.display = "block";
        } else if (filter === item.dataset.id) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
})();
//search function
(function () {
  let form = document.querySelector(".form");
  form.addEventListener("keyup", (event) => {
    event.preventDefault();
    let input = document.querySelector(".input");
    let value = input.value.toLowerCase().trim();
    let items = document.querySelectorAll(".store-item");
    items.forEach((item) => {
      let type = item.dataset.id;
      let length = value.length;
      let match = type.slice(0, length);
      if (value === match) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
})();
/* --- Filter Code --- */

/* --- Modal Code --- */
(function () {
  //varijable
  let modal = document.querySelector(".modal-container");
  let modalImg = document.querySelector(".img-modal");
  let btns = document.querySelectorAll(".modalBtn");
  let closeBtn = document.querySelector(".close-modal");
  let imagesList = [];
  let numberIndex;
  let images = document.querySelectorAll(".store-img");
  //eventi
  images.forEach((img) => {
    imagesList.push(img.src);
  });
  images.forEach((img) => {
    img.addEventListener("click", (event) => {
      openCloseModal("show");
      let fullSrc = event.target.getAttribute("src");
      modalImg.src = fullSrc;
      let index = fullSrc.indexOf("-");
      let number = fullSrc.slice(index + 1);
      let backIndex = number.indexOf(".jpg");
      let orgNumber = number.slice(0, backIndex);
      numberIndex = parseInt(orgNumber);
    });
    closeBtn.addEventListener("click", (event) => {
      event.preventDefault();
      openCloseModal("hide");
    });
  });
  //funkcije
  function openCloseModal(action) {
    if (action === "show") {
      modal.classList.add(action);
    } else if (action === "hide") {
      modal.classList.remove("show");
    }
  }
  btns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      if (btn.parentElement.classList.contains("right-modal")) {
        numberIndex++;
        if (numberIndex > imagesList.length - 1) {
          numberIndex = 1;
        }
        modalImg.src = `./img/car-${numberIndex}.jpg`;
      } else if (btn.parentElement.classList.contains("left-modal")) {
        numberIndex--;
        if (numberIndex < 1) {
          numberIndex = imagesList.length - 1;
        }
        modalImg.src = `./img/car-${numberIndex}.jpg`;
      }
    });
  });
})();
/* --- Modal Code --- */
/* --- Cart Code --- */
let cart = document.querySelector('.cart_container');
let lower = document.querySelector('.lowerPart');
cart.addEventListener('click', ()=>{
  lower.classList.toggle('cartShow')
})
/* --- Cart Code --- */