let allInput = document.querySelectorAll("input");
let form = document.querySelector("form");
const BASE_URL = " http://localhost:8000/cofee";
const id = new URLSearchParams(window.location.search).get("id");

async function formData() {
  let response = await axios(`${BASE_URL}/${id}`);
  allInput[1].value = response.data.title;
  allInput[2].value = response.data.price;
}
if (id) {
  formData();
}

form.addEventListener("submit",  function (e) {
  e.preventDefault();
  console.log("z");
  let newObject = {
    image: `./assets/image/${allInput[0].value.split("\\")[2]}`,
    title: allInput[1].value,
    price: allInput[2].value,
  };

  if (!id) {
    if (
      allInput[0] != "" &&
      allInput[1].value != "" &&
      allInput[2].value != ""
    ) {
         axios.post(`${BASE_URL}`,newObject)
    }else{
      window.alert("inputlari doldur")
    }
  }else{
    axios.patch(`${BASE_URL}/${id}` ,newObject)

  }
});
