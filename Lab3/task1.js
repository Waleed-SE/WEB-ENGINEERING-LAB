function checkNegative(value) {
  if (value >= 0) {
    return true;
  } else {
    return false;
  }
}

function increment() {
  var temp = document.getElementById("totalPeople");
  temp.value = Number(temp.value) + 1;
}

function decrement() {
  var temp = document.getElementById("totalPeople");
  temp.value =
    Number(temp.value) > 0 ? Number(temp.value) - 1 : Number(temp.value);
}

function calculateBill() {
  let bill = parseFloat(document.getElementById("totalBill").value);
  let tips = parseFloat(document.getElementById("tips").value);
  let people = parseFloat(document.getElementById("totalPeople").value);
  let total = 0;
  let tax = 5;

  if (bill < 0 || tips < 0 || tips > 100 || people < 0) {
    return;
  } else {
    tips = (tips * bill) / 100;
    total = bill + tips;
    tax = (tax * total) / 100;
    total = total + tax + tips;
    document.getElementById("totalSummary").textContent = "$" + bill;
    document.getElementById("tipsSummary").textContent = "$" + tips;
    document.getElementById("taxSummary").textContent = "$" + tax;
    document.getElementById("grandTotalSummary").textContent = "$" + total;
  }

  console.log(total, tips, tax);
}
