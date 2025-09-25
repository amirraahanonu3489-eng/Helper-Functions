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
    div.textContent = `${item.product.name} - $${item.product.price.toFixed(2)} x ${item.quantity}`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      cart.removeItem(item.product);
      localStorage.setItem("cartItems", JSON.stringify(cart.getItems()));
      renderCart();

      document.getElementById("cart-count").textContent = cart.totalQuantity;
    });

    div.appendChild(removeBtn);
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = "Total: $" + cart.total.toFixed(2);

  document.getElementById("cart-count").textContent = cart.totalQuantity;
}

renderCart();

