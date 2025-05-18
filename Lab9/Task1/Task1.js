document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const emailInput = document.getElementById("email");
  const messageDiv = document.getElementById("message");

  let isEmailAvailable = false;

  // Function to show Bootstrap alerts
  const showAlert = (type, message) => {
    messageDiv.className = `alert alert-${type}`; // Use Bootstrap's alert classes
    messageDiv.textContent = message;
    messageDiv.style.display = "block"; // Display the alert
  };

  // Check email availability on blur
  emailInput.addEventListener("blur", async () => {
    const email = emailInput.value.trim();
    if (email) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/students/check-email/${email}`
        );
        const data = await response.json();
        if (data.exists) {
          isEmailAvailable = false;
          showAlert("danger", "Email is already taken!"); // "danger" for error
        } else {
          isEmailAvailable = true;
          showAlert("success", "Email is available!"); // "success" for valid email
        }
      } catch (err) {
        showAlert("danger", "Error validating email!");
      }
    }
  });

  // Form submission handling
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!isEmailAvailable) {
      showAlert("danger", "Please use an available email!");
      return;
    }

    const formData = {
      name: document.getElementById("name").value.trim(),
      email: emailInput.value.trim(),
      password: document.getElementById("password").value.trim(),
      department: document.getElementById("department").value.trim(),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/students/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        showAlert("success", "Student registered successfully!");
        form.reset(); // Reset form after successful submission
      } else {
        showAlert("danger", "Registration failed!");
      }
    } catch (err) {
      showAlert("danger", "Error submitting the form!");
    }
  });
});
