const productsDiv = document.querySelector(".products");
const favCount = document.querySelector(".fav-count");
let basketCount = document.querySelector(".basket-count");
const BASE_URL = " http://localhost:8000/cofee";
const search = document.querySelector(".search");

let favProduct = getFavaFromLocaleStrogeProduct();
calculateCount(favProduct.length);
let product = [];

let basket = getBasketFromLocaleStroge();
calculateCountBasket(basket.length);
getBasketCount()
let array = null;
let arrayCopy = null;
async function getData() {
  let res = await axios(`${BASE_URL}`);
  //   console.log(res.data);
  product = res.data;
  array = res.data;
  arrayCopy = structuredClone(array);
  drawCooffe(res.data);
}

getData();

function drawCooffe(data) {
  productsDiv.innerHTML = "";
  data.forEach((element) => {
    productsDiv.innerHTML += `
    <div class="products-card-one">
    <div class="image">
      <img src="${element.image}" alt="" />
      
    </div>
    <i class="${
      favProduct.some((item) => item.id === element.id)
        ? "fa-solid fa-heart "
        : "fa-regular fa-heart"
    }" onclick=favIcon(${element.id},this)></i>
    <i class="fa-solid fa-cart-shopping" onclick=basketIcon(${
      element.id
    },this)></i>
    <div class="rg">
    <a href="#" class="mug-btn">EXPLORE MUG</a>
    <div class="icons">
    <i class="fa-solid fa-trash fa-beat-fade" onclick=deleteBtn(${
      element.id
    },this)></i>
  <a href="../../form.html?id=${
    element.id
  }"><i class="fa-solid fa-pen-to-square fa-beat-fade"></i></a>
    </div>

    </div>
    <div class="products-text">
      <p class="p-title">${element.title}</p>
     
      <div class="price">
    
                <p class="p-price-two">${element.price}</p>
                </div>
    </div>
  </div>
    `;
  });
}

async function deleteBtn(id, btn) {
  if (confirm("silmeye eminsen")) {
    await axios.delete(`${BASE_URL}/${id}`);
  }
  btn.closest(".products").remove;
}

function favIcon(id, icon) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
  } else {
    icon.className = "fa-regular fa-heart";
  }

  let favs = getFavaFromLocaleStrogeProduct();

  let bool = favs.find((item) => item.id === id);
  let products = product.find((item) => item.id === id);

  if (bool) {
    favs = favs.filter((item) => item.id !== id);
  } else {
    favs.push(products);
  }
  setFavaFromLocaleStrogeProduct(favs);
  calculateCount(favs.length);
}

function setFavaFromLocaleStrogeProduct(fav) {
  localStorage.setItem("favs", JSON.stringify(fav));
}

function getFavaFromLocaleStrogeProduct() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}

function calculateCount(count) {
  favCount.textContent = count;
}


function basketIcon(id) {
  let basketP = product.find((item) => item.id === id);
  let index = basket.findIndex((item) => item.id === id);

  if (index > -1) {
    basket[index].count = basket[index].count + 1;
    console.log(basket[index]);
  } else {
    basket.push({ count: 1, ...basketP });
  }
  setBasketFromLocaleStroge(basket);
  // calculateCountBasket(basket.length);
  getBasketCount()
}

function setBasketFromLocaleStroge(basket) {
  localStorage.setItem("allproducts", JSON.stringify(basket));
}

function getBasketFromLocaleStroge() {
  return JSON.parse(localStorage.getItem("allproducts")) || [];
}
 
function getBasketCount(){
  basketCount.textContent=basket.reduce((acc,curr)=> acc+curr.count,0)
}
search.addEventListener("submit", function (e) {
  console.log("hello");
  e.preventDefault();

  let filtered = array.filter((item) =>
    item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );

  drawCooffe(filtered);
});
