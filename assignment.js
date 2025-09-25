import { createHeader } from "./header.js";
import { createProductList } from "./app.js";

const root = document.getElementById("root");
const header = createHeader();
root.appendChild(header);

const content = document.createElement("div");

function getWelcomeMessage(name) {
  return `Welcome, ${name}!`;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}


console.log(getWelcomeMessage("Mira")); // "Welcome, Mira!"
console.log("10 / 2 =", divide(10, 2)); // 5
console.log("4 x 3 =", multiply(4, 3)); // 12

const main = document.createElement("main");
main.style.display = "flex";
main.style.alignItems = "center";
main.style.backgroundColor = "white";

const productList = createProductList();
main.appendChild(productList);

root.appendChild(main);


//* I could also add innerHTML, "header.innerHTML = `...` " but I wanted to practice creating elements and styling them with JS.

//*I would need to add the JavaScript style (cdn) in the HTML file to see the changes in the browser. Then in my js file I would 
// need to link the HTML file with "document.getElementById" to see the changes in the browser. Then I would create an element
// with "document.createElement" and then I could use header.innerHTML = `...` to add the HTML structure inside the header element.
//* Finally I would append the header to the root element with "root.appendChild(header)".

//* This would look like this: 
// const root = document.getElementById("root");
// const header = document.createElement("header");  // I could also add a header.className
// header.innerHTML = `
//   <h1 style="color: white; margin: 0;">amazon</h1>
//   <div style="flex: 1; display: flex; justify-content: center; align-items: center;">
//     <input type="text" placeholder="Search" style="width: 500px; padding: 5px;" />

// class Product {
// constructor(name,description,price) {
// this.name = name;
// this.description = description;
// this.price = price;
// }
// render(parent) {
// const product = document.createElement('div');
// product.innerHTML = '
// <h2>${this.name}</h2>
// ';
// parent.appendChild(product);
// }
// export default Product;
