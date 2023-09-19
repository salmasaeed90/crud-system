var pname = document.getElementById("productName");
var pCategory = document.getElementById("productCategory");
var price = document.getElementById("productPrice");
var desc = document.getElementById("productdescription");
var searchProduct = document.getElementById("searchproduct");
var addBtn = document.getElementById("add_product");
var productList;

var cases = "create";
var help;

if (localStorage.getItem("product") === null) {
  productList = [];
} else {
  productList = JSON.parse(localStorage.getItem("product"));
  display();
}
// create object and push it to array
function createProduct() {
  if (isNameValid()) {
    var product = {
      prodName: pname.value,
      prodCategory: pCategory.value,
      productPrice: price.value,
      prodDesc: desc.value,
    };
    if (cases === "create") {
      productList.push(product);
      localStorage.setItem("product", JSON.stringify(productList));
      display();
    } else {
      productList[help] = product;
      display();
      document.getElementById("add_product").innerHTML = "Add Product";
    }
    Reset();
    document.querySelector(".nameAlert").classList.add("d-none");
  } else {
    document.querySelector(".nameAlert").classList.remove("d-none");
  }
}
function isNameValid() {
  var nameRegax = /^[A-Z][a-z]{3,9}$/;
  var prodname = pname.value;
  if (nameRegax.test(prodname)) {
    return true;
  } else {
    return false;
  }
}
// function priceValidation() {
//   var priceRegax = /^[A-Z][a-z]{3,9}$/;
//   var prodprice = price.value;
//   if (priceRegax.test(prodprice)) {
//     return true;
//   } else {
//     return false;
//   }
// }

//delete input values after adding to ui
function Reset() {
  pname.value = "";
  pCategory.value = "";
  price.value = "";
  desc.value = "";
}

//add last product object in array to ui
function display() {
  //بتعرض اخر حاجة في arr
  var trs = "";
  for (var i = 0; i < productList.length; i++) {
    trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${productList[i].prodName}</td>
        <td>${productList[i].prodCategory}</td>
        <td>${productList[i].productPrice}</td>
        <td>${productList[i].prodDesc}</td>
        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})"><i class="fa-solid fa-edit"></i></button></td>
        <td>
            <button class="btn btn-outline-danger" onclick="deleteProd(${i})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>
        `;
  }
  document.getElementById("tableBody").innerHTML = trs;
}
//delete product function
function deleteProd(index) {
  productList.splice(index, 1);
  localStorage.setItem("product", JSON.stringify(productList));
  display();
  console.log(productList);
}

///search by product name
function searchProd() {
  var trs = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].prodName.includes(searchProduct.value)) {
      if (searchProduct.value != "") {
        trs += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i].prodName.replace(
              searchProduct.value,
              `<mark>${searchProduct.value}</mark>`
            )}</td>
            <td>${productList[i].prodCategory}</td>
            <td>${productList[i].productPrice}</td>
            <td>${productList[i].prodDesc}</td>
            <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})"><i class="fa-solid fa-edit"></i></button></td>
            <td>
                <button class="btn btn-outline-danger" onclick="deleteProd(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
            `;
      } else {
        trs += `<tr>
            <td>${i + 1}</td>
            <td>${productList[i].prodName}</td>
            <td>${productList[i].prodCategory}</td>
            <td>${productList[i].productPrice}</td>
            <td>${productList[i].prodDesc}</td>
            <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})"><i class="fa-solid fa-edit"></i></button></td>
            <td>
                <button class="btn btn-outline-danger" onclick="delte(${i})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
            </tr>
            `;
      }
    }
    document.getElementById("tableBody").innerHTML = trs;
  }
}

//update value of product
function updateProduct(i) {
  pname.value = productList[i].prodName;
  pCategory.value = productList[i].prodCategory;
  price.value = productList[i].productPrice;
  desc.value = productList[i].prodDesc;

  cases = "update";
  document.getElementById("add_product").innerHTML = "Update";
  help = i;
}
