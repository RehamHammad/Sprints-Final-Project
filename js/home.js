/* Products */
const productsContainer = document.getElementById('products-container');

async function getAllProducts() {
  var response = await fetch("https://fakestoreapi.com/products");
  var products = await response.json();
  console.log(products);
  displayProduct(products);
}

function displayProduct(products) {
  products.forEach((element) => {
    productsContainer.innerHTML += `
        <div class="col-12 col-ms-6 col-md-3 mb-4">
              <div class="item">
                <div class="img-box">
                   <img class="w-100" src="${element.image}" alt="">
                   <div class="layer">
                    <button id="${element.id}" onclick="getDetails(${element.id})" class="btn rounded-pill viewBtn">Quick View</button>
                    </div>
                 </div>
              <h6>${element.title}</h6>
              <p>$ ${element.price}</p>
             </div>

    </div>
    
    `;
  });
}
getAllProducts();

/////////////////////////////////
//Git Id
function getDetails(id){
    localStorage.setItem('productId',id);
    window.location.href='../Html/productDetails.html'
}
////////////////////////////////
//Add to cart
