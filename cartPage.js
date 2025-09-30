import cart from "./cart.js";
import { createHeader } from "./header.js";

const root = document.getElementById("root");

const header = createHeader();
root.appendChild(header);

const main = document.createElement("main");
const cartItemsContainer = document.createElement("div");
const summary = document.createElement("div");
main.appendChild(cartItemsContainer);
main.appendChild(summary);
root.appendChild(main);

function renderCart() {
  const items = cart.getItems();
  cartItemsContainer.innerHTML = "";
  summary.innerHTML = "";

  if (items.length === 0) {
    cartItemsContainer.textContent = "Your cart is empty.";
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
      document.getElementById("cart-count").textContent = cart.totalQuantity;
    });

    cartItemsContainer.appendChild(div);
  });

    const delivery = document.createElement("div");
    delivery.innerHTML = `
      <p><strong>Choose a delivery option:</strong></p>
      <label><input type="radio" name="shipping" value="0" checked> Free Shipping</label><br>
      <label><input type="radio" name="shipping" value="4.99"> Express ($4.99)</label><br>
      <label><input type="radio" name="shipping" value="9.99"> Overnight ($9.99)</label>
    `;
    cartItemsContainer.appendChild(delivery)
  
    delivery.querySelectorAll("input[name='shipping']").forEach(radio => {
      radio.addEventListener("change", updateShippingCost);
    });

    updateShippingCost();
  }

    function updateShippingCost() {
      const items = cart.getItems();
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      const selected = document.querySelector("input[name=shipping]:checked");
      const shipping = selected ? parseFloat(selected.value) : 0;

      const tax = subtotal * 0.10;
      const total = subtotal + shipping + tax;

      summary.innerHTML = `
        <h3>Order Summary</h3>
        <p>Items (${cart.totalQuantity}): $${subtotal.toFixed(2)}</p>
        <p>Shipping & Handling: $${shipping.toFixed(2)}</p>
        <p>Total before tax: $${(subtotal + shipping).toFixed(2)}</p>
        <p>Estimated tax (10%): $${tax.toFixed(2)}</p>
        <p class="total"><strong>Order total: $${total.toFixed(2)}</strong></p>
        <button class="place-order">Place your order</button>
    `;
  }

  renderCart();
