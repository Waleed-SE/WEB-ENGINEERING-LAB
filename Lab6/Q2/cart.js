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

function removeFromCart(index) {
  let cart = getCookie("cart");
  cart.splice(index, 1);
  setCookie("cart", cart, 7);
  renderCart();
}

function clearCart() {
  setCookie("cart", [], 7);
  renderCart();
}

function renderCart() {
  let cart = getCookie("cart");
  let cartList = document.getElementById("cartList");
  let totalPrice = 0;
  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Your cart is empty.</li>";
  } else {
    cart.forEach((item, index) => {
      totalPrice += item.price;
      const li = document.createElement("li");
      li.innerHTML = `${item.name} - $${item.price} <button class="remove-item">Remove</button>`;
      cartList.appendChild(li);

      li.querySelector(".remove-item").addEventListener("click", () =>
        removeFromCart(index)
      );
    });
  }

  document.getElementById(
    "totalPrice"
  ).innerHTML = `<strong>Total: </strong>$${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  document.getElementById("clearCart").addEventListener("click", clearCart);
});
