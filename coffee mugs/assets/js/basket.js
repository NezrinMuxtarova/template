const tbody = document.querySelector("tbody");
const basketCount = document.querySelector(".basket-count");
const total = document.querySelector(".total");

let basket = getBasketFromLocaleStroge();
calculateCountBasket(basket.length);

function drawBasketCooffe(data) {
  tbody.innerHTML = "";
  data.forEach((element) => {
    const tr = document.createElement("tr");
    tr.className="tr-element"
    tr.innerHTML = `
        
                              
          <td class="basket-image"> <img src="${element.image} " alt=""> </td>
           <td>${element.title}</td>
           <td>${element.price}</td>
           <td>
            <button class="inc-btn" onclick=incrementCount(${element.id})>+
            </button>
            <span>${element.count} 
            </span>
            <button class="inc-btn" onclick=decrementCount(${element.id},this)>-</button></td>
          <td><button class="btn btn-danger" onclick=deleteProduct(this,"${element.id}")>Delete</button></td>

        `;

    tbody.append(tr);
  });
}

drawBasketCooffe(basket);

function setBasketFromLocaleStroge(basket) {
  localStorage.setItem("allproducts", JSON.stringify(basket));
}

function getBasketFromLocaleStroge() {
  return JSON.parse(localStorage.getItem("allproducts")) ?? [];
}

function calculateCountBasket(count) {
  basketCount.textContent = count;
}

function deleteProduct(btn, id) {
  console.log(id);
  basket = basket.filter((item) => item.id != id);

  btn.closest("tr").remove();

  setBasketFromLocaleStroge(basket);
  getTotalPrice();
  getBasketCount();
}

function getBasketCount() {
  basketCount.textContent = basket.reduce((acc, curr) => acc + curr.count, 0);

  

}

function getTotalPrice() {
  let sum = basket.reduce((arr, curr) => arr + curr.count * curr.price, 0);
  total.textContent = sum;

}

function incrementCount(id) {
  // let basketProduct=getBasketFromLocaleStroge()

  let incCount = basket.find((item) => item.id === id);
  incCount.count += 1;
  // console.log(incCount.id);
  console.log(basket);

  setBasketFromLocaleStroge(basket);
  drawBasketCooffe(basket);
  getTotalPrice();
getBasketCount()
}
function decrementCount(id, btn) {
  let decCount = basket.find((item) => item.id === id);
  if (decCount.count > 1) {
    decCount.count -= 1;
  } else  {
    basket =  basket.filter((item)=>item.id!=id)
    console.log(id);
    btn.closest(".tr-element").remove()
  } 
  setBasketFromLocaleStroge(basket);
  drawBasketCooffe(basket);
  getTotalPrice();
  getBasketCount()

}

getTotalPrice();
getBasketCount();
