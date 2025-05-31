const DetailsContainer=document.getElementById('Details-container');

async function getDetails(){
    const productId=localStorage.getItem('productId');
     var response = await fetch(`https://fakestoreapi.com/products/${productId}`);
     var product = await response.json();
     console.log(product);
     displayDetails(product);
}


function displayDetails(product){
  DetailsContainer.innerHTML = `
    <div class="col-md-6">
      <div class="productsDetails">
        <img class="w-75" src="${product.image}" alt="">
      </div>
    </div>
    <div class="col-md-6">
      <div class="productsDetails">
        <h3 class="my-3">${product.category}</h3>
        <h4>${product.title}</h4>
         <p class="my-3">$${product.price}</p>
        <p class="desc my-3">${product.description}</p>
        <div class="detailsButtons">
        <div class="btn-group" role="group" aria-label="Basic example">
           <button type="button" onclick="changeCount(-1)" class="btn btn-left py-2 px-3"> - </button>
           <button type="button" id="counter"  class="btn btn-middle py-2 px-3">0</button>
           <button type="button" onclick="changeCount(1)" class="btn btn-right py-2 px-3"> + </button>
        </div>
        <button onclick="addToCart(${product.id})" class="btn rounded-pill my-3 AddBtn">ADD TO CART</button>
        <button onclick="window.location.href='../Html/Cart.html'" class="btn rounded-pill my-3 AddBtn">GO TO CART</button>
        </div>
      </div>
    </div>
  `;
}

getDetails();

//////////////Change Count //////////////////////////
let count=0;
function changeCount(amount){
    count+=amount;
    document.getElementById('counter').textContent=count;
}

///////////////////////////////////////////////////
//Add to cart
function addToCart(id){
  let cart=JSON.parse(localStorage.getItem('cart')) || {}
  if(cart[id]){
    cart[id] +=1
  }else{
    cart[id]=1
  }
  localStorage.setItem("cart",JSON.stringify(cart));
}
