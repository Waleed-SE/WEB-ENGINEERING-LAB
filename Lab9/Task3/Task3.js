document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const feedbackTable = document.querySelector("#feedbackTable tbody");
  
    // Function to fetch all feedback
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feedback");
        if (!response.ok) throw new Error("Failed to fetch feedback");
        const feedbacks = await response.json();
  
        // Clear existing entries
        feedbackTable.innerHTML = "";
  
        // Populate feedback entries
        feedbacks.forEach(feedback => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${feedback.name}</td>
            <td>${feedback.email}</td>
            <td>${feedback.message}</td>
          `;
          feedbackTable.appendChild(row);
        });
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
  
    // Function to submit feedback
    const submitFeedback = async (event) => {
      event.preventDefault(); // Prevent form submission
      try {
        const newFeedback = {
          name: document.getElementById("name").value.trim(),
          email: document.getElementById("email").value.trim(),
          message: document.getElementById("message").value.trim(),
        };
  
        // Validate fields
        if (!newFeedback.name || !newFeedback.email || !newFeedback.message) {
          alert("All fields are required!");
          return;
        }
  
        // POST request to the server
        const response = await fetch("http://localhost:5000/api/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFeedback),
        });
  
        if (!response.ok) throw new Error("Failed to submit feedback");
  
        alert("Feedback submitted successfully!");
        feedbackForm.reset(); // Clear form inputs
        fetchFeedback(); // Refresh feedback list
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    };
  
    // Add event listener to the form
    feedbackForm.addEventListener("submit", submitFeedback);
  
    // Fetch feedback on page load
    fetchFeedback();
  });
  