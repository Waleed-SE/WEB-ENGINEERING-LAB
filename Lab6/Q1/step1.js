document
  .getElementById("step1Form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Save data to localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    // Redirect to step2.html
    window.location.href = "step2.html";
  });
