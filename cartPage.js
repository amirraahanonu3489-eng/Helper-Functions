import cart from "./cart.js";
import { createHeader } from "./header.js";

const root = document.getElementById("root");

const header = createHeader();
root.appendChild(header);

const main = document.createElement("main");
const cartItemsContainer = document.createElement("div");
const cartTotal = document.createElement("h2");
main.appendChild(cartItemsContainer);
main.appendChild(cartTotal);
root.appendChild(main);

function renderCart() {
  const items = cart.getItems();
  cartItemsContainer.innerHTML = "";

  if (items.length === 0) {
    cartItemsContainer.textContent = "Your cart is empty.";
    cartTotal.textContent = "";
    return;
  }

  items.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
    <img src="${item.product.image}" alt="${item.product.name}" style="width:100px; height:100px; object-fit:cover;">
    <div class="cart-details" style="flex:2;">
      <p><strong>${item.product.name}</strong></p>
      <p style="color:red;">$${item.product.price.toFixed(2)}</p>
      <p>Quantity: ${item.quantity} 
        <a href="#" class="update">Update</a> 
        <a href="#" class="delete">Delete</a>
      </p>
    </div>
  `;

    const delivery = document.createElement("div");
    delivery.innerHTML = `
      <p><strong>Choose a delivery option:</strong></p>
      <label><input type="radio" checked> Free Shipping</label><br>
      <label><input type="radio"> Express ($4.99)</label><br>
      <label><input type="radio"> Overnight ($9.99)</label>
    `;
    div.appendChild(delivery);
    
    div.querySelector(".update").addEventListener("click", (e) => {
      e.preventDefault();
      const qty = parseInt(prompt("Enter new quantity:", item.quantity));
      if (!isNaN(qty) && qty > 0) {
        cart.updateItem(item.product, qty);
        localStorage.setItem("cartItems", JSON.stringify(cart.getItems()));
        renderCart();
        document.getElementById("cart-count").textContent = cart.totalQuantity;
      }
    });

    div.querySelector(".delete").addEventListener("click", (e) => {
      e.preventDefault();
      cart.removeItem(item.product);
      localStorage.setItem("cartItems", JSON.stringify(cart.getItems()));
      renderCart();
    });

      document.getElementById("cart-count").textContent = cart.totalQuantity;

    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = "Total: $" + cart.total.toFixed(2);

  document.getElementById("cart-count").textContent = cart.totalQuantity;
}

renderCart();

