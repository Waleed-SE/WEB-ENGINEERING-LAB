document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const dashboard = document.getElementById("dashboard");
  const userName = document.getElementById("userName");
  const userEmail = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  // Check for stored session
  const checkSession = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      showDashboard(userData);
    }
  };

  // Show dashboard
  const showDashboard = (userData) => {
    loginForm.classList.add("d-none");
    dashboard.classList.remove("d-none");
    userName.textContent = userData.name;
    userEmail.textContent = userData.email;
  };

  // Handle login
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const userData = await response.json();
      localStorage.setItem("user", JSON.stringify(userData));
      showDashboard(userData);
    } catch (error) {
      alert("Login failed. Please check your email and password.");
    }
  });

  // Handle logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    loginForm.classList.remove("d-none");
    dashboard.classList.add("d-none");
  });

  // Check session on page load
  checkSession();
});
