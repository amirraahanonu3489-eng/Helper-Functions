import products from "./products.js";

export function createProductList() {
    const container = document.getElementById("products");

products.forEach(product => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>$${product.price.toFixed(2)}</p>

    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
    
    <button>Add to Cart</button>
  `;
  container.appendChild(card);
});

    return container;
}
