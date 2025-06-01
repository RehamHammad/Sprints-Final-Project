async function showCheckoutProducts() {
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const tbody = document.getElementById("checkoutBody");
    const totalEl = document.getElementById("grandTotal");
    tbody.innerHTML = '';
    let grandTotal = 0;

    for (const id of Object.keys(cart)) {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const product = await res.json();
            const quantity = cart[id];
            const totalPrice = product.price * quantity;

            grandTotal += totalPrice;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td><img class="w-25" src="${product.image}"></td>
                <td>${product.price} $</td>
                <td>${quantity}</td>
                <td>${totalPrice.toFixed(2)} $</td>
            `;
            tbody.appendChild(row);
        } catch (error) {
            console.error("Failed to fetch product:", id);
        }
    }

    totalEl.textContent = `Total: ${grandTotal.toFixed(2)} $`;
}

showCheckoutProducts();

document.getElementById("goBackToCart").addEventListener("click", () => {
    window.location.href = "cart.html";
});
