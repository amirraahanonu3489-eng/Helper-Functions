const root = document.getElementById("root");

const header = document.createElement("header");
header.style.display = "flex";
header.style.alignItems = "center";
header.style.justifyContent = "space-between";
header.style.padding = "10px 20px";
header.style.backgroundColor = "black";

const logo = document.createElement("h1");
logo.style.color = "white";
logo.style.margin = "0";
logo.textContent = "amazon";
logo.style.margin = "0px";
logo.style.fontSize = "24px";
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

const searchButton = document.createElement("button");
searchButton.textContent = "🔍";
searchButton.style.height = "30px";

searchContainer.appendChild(searchInput);
searchContainer.appendChild(searchButton);
header.appendChild(searchContainer);

const linksContainer = document.createElement("div");
linksContainer.innerHTML = `
    <span style="color: white; margin-right: 15px;">Returns & Orders</span>
    <span style="color: white;">🛒 Cart</span>
`;
header.appendChild(linksContainer);

root.appendChild(header);

function createAlertMessage() {
  alert("This is an alert message!");
}

function getWelcomeMessage(name) {
  return `Welcome, ${name}!`;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

createAlertMessage();

console.log(getWelcomeMessage("Mira"));
console.log("10 / 2 =", divide(10, 2));
console.log("4 x 3 =", multiply(4, 3));
