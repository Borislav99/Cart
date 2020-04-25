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
/* -------- Cart Code -------- */
(function () {
  //klase
  class UI {
    constructor(){
      this.cartItemsNumber = document.querySelector('.number')
      this.cartItemsTotal = document.querySelector('.total')
      this.cartTotalPrice = document.querySelector('.cartTotal_price')
    }
    /* --- Show and Hide Cart --- */
    showHideCart() {
      lower.classList.toggle("cartShow");
    }
  /* --- Add Items inside the Cart and save in Local Storage --- */
    addToDOM(img, name, price) {
      let object = {
        img,
        name,
        price,
      };
      this.addToCart(object);
      Storage.addToStorage(object);
    }
  /* --- Add Item in Cart --- */
    addToCart(object) {
      let div = document.createElement("div");
      div.classList.add("cartSingleItem");
      div.innerHTML = `
                    <div class="cartImg_container">
                <img src="./${object.img}.jpg" alt="" class="cartImg" />
              </div>
              <div class="cartDetails_container">
                <span class="cartDetails">${object.name}</span>
                <span class="cartPrice">$ ${object.price}.000</span>
              </div>
      `;
      cartList.insertBefore(div, totalDiv);
    }
  /* --- Calculate Total and Length --- */
    calculate(){
      let prices = [];
      JSON.parse(localStorage.getItem('carList')).forEach(item=>{
        prices.push(item.price)
      });
      //console.log(prices);
      let length = prices.length;
      let total = prices.reduce(function(acc,curr){
        acc += curr;
        return acc;
      },0);
      //console.log(length);
      //console.log(total);
      this.setCalculatedValues(length, total);
    }
  /* --- Set Calculated Values --- */
    setCalculatedValues(length,total){
      this.cartItemsNumber.textContent = length;
      this.cartItemsTotal.textContent = `${total}.000`;
      this.cartTotalPrice.textContent = `${total}.000`;
    }
  }
  class Storage {
  /* --- Add to Local Storage  --- */
    static addToStorage(object){
      //console.log(object);
      let calculateArr;
      if(localStorage.getItem('carList')){
        calculateArr = JSON.parse(localStorage.getItem('carList'));
      }else {
        calculateArr = [];
      }
      calculateArr.push(object);
      localStorage.setItem('carList', JSON.stringify(calculateArr));
    }
  /* --- Clear the Storage and Cart DOM --- */
    static clearStorage(length,total){
      localStorage.removeItem('carList');
      while(lower.children.length>2){
        lower.removeChild(lower.children[0]);
      }
      ui.setCalculatedValues(length, total);
    }
  }
  //varijable
  let ui = new UI();
  let cart = document.querySelector(".cart_container");
  let cartIcon = document.querySelectorAll(".cartIcon");
  let clearCart = document.querySelector('.clearCart');
  let cartList = document.querySelector('.lowerPart');
  let lower = document.querySelector(".lowerPart");
  let totalDiv = document.querySelector('.cartTotal');
  //eventi
  cart.addEventListener("click", () => {
    ui.showHideCart();
  });
  //
  cartIcon.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      let img =
        event.target.parentElement.parentElement.parentElement.children[1].src;
      let index = img.indexOf("img");
      img = img.slice(index);
      let jpegIndex = img.slice(-4);
      let index2 = img.indexOf(jpegIndex);
      img = img.slice(0, index2);
      let name = event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[0].textContent.trim();
      let price = parseInt(
        event.target.parentElement.parentElement.parentElement.parentElement.children[1].children[1].textContent
          .slice(2)
          .trim()
      );
      ui.addToDOM(img, name, price);
      ui.calculate();
    });
  });
  clearCart.addEventListener('click', event=>{
    event.preventDefault();
    Storage.clearStorage("", "0");
  })
  document.addEventListener('DOMContentLoaded', ()=>{
    if(localStorage.getItem('carList')){
      let list = JSON.parse(localStorage.getItem('carList'));
      console.log(list);
      list.forEach(item=>{
        ui.addToCart(item);
        ui.calculate();
      })
    }
  })
})();
/* -------- Cart Code -------- */
