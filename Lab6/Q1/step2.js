// Retrieve data from localStorage
document.getElementById("displayName").textContent =
  localStorage.getItem("name") || "N/A";
document.getElementById("displayEmail").textContent =
  localStorage.getItem("email") || "N/A";

document
  .getElementById("step2Form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const phone = document.getElementById("phone").value;

    // Save phone number to localStorage
    localStorage.setItem("phone", phone);

    // Show confirmation message
    document.getElementById("confirmationMessage").style.display = "block";
  });
