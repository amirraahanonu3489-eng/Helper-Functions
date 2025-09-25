import cart from "./cart.js";

export function createHeader() {
const header = document.createElement("header");
header.style.display = "flex";
header.style.alignItems = "center";
header.style.justifyContent = "space-between";
header.style.padding = "0px 20px";
header.style.backgroundColor = "#212121";

const logo = document.createElement("h1");
logo.style.marginBottom = "2px";
const logoImg = document.createElement("img");
logoImg.src = "images/amazonlogo.jpg"; 
logoImg.alt = "Amazon Logo";
logoImg.style.height = "40px";
logo.appendChild(logoImg);
header.appendChild(logo);

const searchContainer = document.createElement("div");
searchContainer.style.flex = "1";
searchContainer.style.display = "flex";
searchContainer.style.justifyContent = "center";
searchContainer.style.alignItems = "center";

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Search";
searchInput.style.width = "500px";
searchInput.style.padding = "5px";

const houseLink = document.createElement("a");
houseLink.href = "index.html";
const houseIcon = document.createElement("i");
houseIcon.className = "fa-solid fa-house";
houseIcon.style.fontSize = "20px";
houseIcon.style.color = "white";
houseIcon.style.marginRight = "20px";
houseLink.appendChild(houseIcon);

const searchButton = document.createElement("button");
searchButton.textContent = "🔍";
searchButton.style.height = "30px";

searchContainer.appendChild(houseLink); 
searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
header.appendChild(searchContainer);

const linksContainer = document.createElement("div");
linksContainer.innerHTML = `
    <span style="color: pink; margin-right: 15px;">Returns & Orders</span>
    <a href="cart.html" id="cart" style="color: pink; text-decoration: none;">
      🛒 Cart(<span id="cart-count">0</span>)
    </a>
`;
header.appendChild(linksContainer);

const cartCount = header.querySelector("#cart-count");
cartCount.textContent = cart.totalQuantity;

return header;
}