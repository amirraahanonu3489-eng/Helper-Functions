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

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="product-details">
    <img src="${item.product.image}" alt="${item.product.name}" style="width:150px; height:150px; object-fit:cover;">
    <div class="cart-details" style="flex:2;">
      <p><strong>${item.product.name}</strong></p>
      <p style="color:red;"><strong>$${item.product.price.toFixed(2)}</p>
      <p style="font-weight:100;">Quantity: ${item.quantity} 
        <a href="#" class="update">Update</a> 
        <a href="#" class="delete">Delete</a>
      </p>
    </div>

      <div class="delivery-options">
        <p><strong>Choose a delivery option:</strong></p>
        <label style="font-weight:100;"><input type="radio" name="shipping-${index}" value="0" checked> Free Shipping</label><br>
        <label style="font-weight:100;"><input type="radio" name="shipping-${index}" value="4.99"> Express ($4.99)</label><br>
        <label style="font-weight:100;"><input type="radio" name="shipping-${index}" value="9.99"> Overnight ($9.99)</label>
      </div>
    </div>
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

    div.querySelectorAll(`input[name='shipping-${index}']`).forEach(radio => {
      radio.addEventListener("change", updateShippingCost);
    });

    cartItemsContainer.appendChild(div);
  });
  
    updateShippingCost();
  }

    function updateShippingCost() {
      const items = cart.getItems();
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      let shipping = 0;
      items.forEach((item, index) => {
        const selected = document.querySelector(`input[name='shipping-${index}']:checked`);
        shipping += selected ? parseFloat(selected.value) : 0;
      });

      const tax = subtotal * 0.10;
      const total = subtotal + shipping + tax;

      summary.innerHTML = `
      <div class="summary-box">
        <h3>Order Summary</h3>
        <p>Items (${cart.totalQuantity}): $${subtotal.toFixed(2)}</p>
        <p>Shipping & Handling: $${shipping.toFixed(2)}</p>
        <p>Total before tax: $${(subtotal + shipping).toFixed(2)}</p>
        <p>Estimated tax (10%): $${tax.toFixed(2)}</p>
        <p style="border-bottom:1px solid #ccc;"></p>
        <p class="total"><strong>Order total: $${total.toFixed(2)}</strong></p>
        <button class="place-order">Place your order</button>
    `;
  }

  renderCart();
