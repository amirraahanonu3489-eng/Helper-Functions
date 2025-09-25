import products from "./products.js";
import cart from "./cart.js";

export function createProductList() {
  const container = document.getElementById("products");
  const cartCount = document.getElementById("cart-count")

  cartCount.textContent = cart.totalQuantity;

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt=${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <div class="action">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button>Add to Cart</button>
      </div>
    `;
    container.appendChild(card);

    const button = card.querySelector("button");
    const select = card.querySelector("select");
    button.addEventListener("click", () => {
      const quantity = parseInt(select.value, 10);
      cart.addItem(product, quantity);

      cartCount.textContent = cart.totalQuantity;
      console.log("Cart items:", cart.getItems());
      console.log("Cart total: $" + cart.total.toFixed(2));
    });
  });

  return container;
}

