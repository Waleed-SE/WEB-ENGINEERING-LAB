const products = [
  { name: "Product A", price: 10 },
  { name: "Product B", price: 15 },
  { name: "Product C", price: 20 },
  { name: "Product D", price: 25 },
];

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  let cookie = cookies.find((row) => row.startsWith(name + "="));
  return cookie ? JSON.parse(decodeURIComponent(cookie.split("=")[1])) : [];
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name +
    "=" +
    encodeURIComponent(JSON.stringify(value)) +
    expires +
    "; path=/";
}

function addToCart(product) {
  let cart = getCookie("cart");
  cart.push(product);
  setCookie("cart", cart, 1);
  alert(`${product.name} added to cart!`);
}

function renderProductList() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
          <span>${product.name} - $${product.price}</span>
          <button class="add-to-cart">Add to Cart</button>
      `;
    productList.appendChild(li);

    li.querySelector(".add-to-cart").addEventListener("click", () =>
      addToCart(product)
    );
  });
}

document.addEventListener("DOMContentLoaded", renderProductList);
