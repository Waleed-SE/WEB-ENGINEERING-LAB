document.addEventListener("DOMContentLoaded", () => {
  const jobListing = document.getElementById("jobListing");
  const applyForm = document.getElementById("applyForm");
  let currentJobId = null;

  // Function to fetch all jobs and display them
  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/jobs");
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const jobs = await response.json();

      jobListing.innerHTML = ""; // Clear existing job listings
      jobs.forEach((job) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${job.title}</h5>
              <p class="card-text">${job.description}</p>
              <button class="btn btn-primary apply-btn" data-id="${job._id}" data-bs-toggle="modal" data-bs-target="#applyModal">Apply Now</button>
            </div>
          </div>
        `;
        jobListing.appendChild(card);
      });

      // Attach click listeners to "Apply Now" buttons
      document.querySelectorAll(".apply-btn").forEach((button) => {
        button.addEventListener("click", () => {
          currentJobId = button.dataset.id;
        });
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Function to handle the application submission
  const submitApplication = async (event) => {
    event.preventDefault();
    try {
      const application = {
        jobId: currentJobId,
        name: document.getElementById("applicantName").value.trim(),
        email: document.getElementById("applicantEmail").value.trim(),
        resumeLink: document.getElementById("resumeLink").value.trim(),
      };

      if (!application.jobId || !application.name || !application.email || !application.resumeLink) {
        alert("All fields are required!");
        return;
      }

      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      alert("Application submitted successfully!");
      applyForm.reset();
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  // Event listener for form submission
  applyForm.addEventListener("submit", submitApplication);

  // Fetch jobs on page load
  fetchJobs();
});
