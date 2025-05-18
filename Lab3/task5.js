function increment() {
  var temp = document.getElementById("count");
  temp.value = Number(temp.value) + 1;
}

function decrement() {
  var temp = document.getElementById("count");
  temp.value =
    Number(temp.value) > 0 ? Number(temp.value) - 1 : Number(temp.value);
}

function checkNegative() {
  var temp = document.getElementById("count");
  temp.value = Number(temp.value) < 0 ? 0 : Number(temp.value);
}
