const productsDiv = document.querySelector(".products");
const favCount = document.querySelector(".fav-count");
const BASE_URL = " http://localhost:8000/cofee";


let favProduct = getFavaFromLocaleStrogeProduct();
calculateCount(favProduct.length)

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
      <i class="fa-solid fa-cart-shopping"></i>
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
drawCooffe(favProduct)


  function favIcon(id,btn){
    favProduct=favProduct.filter((item)=>item.id!==id)
    btn.closest(".products-card-one").remove()
    setFavaFromLocaleStrogeProduct(favProduct)
    calculateCount(favProduct.lenght)
  }

  function setFavaFromLocaleStrogeProduct(fav){
    localStorage.setItem("favs", JSON.stringify(fav))
  }
  function getFavaFromLocaleStrogeProduct(){
    return JSON.parse(localStorage.getItem("favs")) || []

  }

  function calculateCount(count){
    favCount.textContent=count
  }