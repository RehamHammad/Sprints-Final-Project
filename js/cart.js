
async function showCartProduct() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    if (Object.keys(cart).length === 0) {
        alert('Cart is empty');
        return;
    }

    const tableBody = document.getElementById('tBody');
    tableBody.innerHTML = '';
    
    for (const id of Object.keys(cart)) {
        try {
            const req = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await req.json();
            const quantity = cart[id];
            const totalPrice = (product.price * quantity).toFixed(2);
            const row = document.createElement("tr");
            row.setAttribute('data-product-id', id);

            row.innerHTML = `
                <td><img class="w-25" src="${product.image}"></td>
                <td>${product.price} $</td>
                <td>${quantity}</td>
                <td>${totalPrice} $</td>
                <td>
                    <button class="btn btn-danger delete-btn" data-product-id="${id}">
                        Delete
                    </button>
                </td>
            `;

            tableBody.appendChild(row);
        } catch (error) {
            console.error("Request failed for product ID:", id);
        }
    }

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            deleteFromCart(productId);
        });
    });
}

function deleteFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    if (cart.hasOwnProperty(productId)) {
        delete cart[productId];
        localStorage.setItem('cart', JSON.stringify(cart));
        
        
        const row = document.querySelector(`tr[data-product-id="${productId}"]`);
        if (row) {
            row.remove();
        }
        
        if (Object.keys(cart).length === 0) {
            alert('Cart is now empty');
            document.getElementById('tBody').innerHTML = '';
        }
    }
}


showCartProduct();

const GoToHomeBtn=document.getElementById('goToHomeBtn');
GoToHomeBtn.addEventListener('click',()=>{
    window.location.href="../Html/home.html"
})

/* ------------------------------------------------ */
/* CheckOut  */
const CheckOut=document.getElementById("goToCheckout");
CheckOut.addEventListener('click',()=>{
    window.location.href='../Html/checkOut.html'
})