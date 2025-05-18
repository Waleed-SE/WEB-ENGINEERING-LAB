document.addEventListener("DOMContentLoaded", async () => {
    const adminSection = document.getElementById("adminSection");
  
    // Function to fetch all jobs and applicants
    const fetchJobsAndApplicants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const jobs = await response.json();
  
        adminSection.innerHTML = ""; // Clear existing content
  
        // Iterate over each job and fetch applicants
        for (const job of jobs) {
          // Create a container for the job and its applicants
          const jobContainer = document.createElement("div");
          jobContainer.className = "mb-4";
  
          // Add job title and description
          jobContainer.innerHTML = `
            <h4>${job.title}</h4>
            <p>${job.description}</p>
            <h5>Applicants:</h5>
            <ul id="applicants-${job._id}">Loading...</ul>
          `;
  
          adminSection.appendChild(jobContainer);
  
          // Fetch and display applicants for this job
          try {
            const applicantsResponse = await fetch(`http://localhost:5000/api/applicants/${job._id}`);
            if (!applicantsResponse.ok) throw new Error(`Failed to fetch applicants for job: ${job.title}`);
            const applicants = await applicantsResponse.json();
  
            const applicantList = document.getElementById(`applicants-${job._id}`);
            applicantList.innerHTML = ""; // Clear the "Loading..." text
  
            if (applicants.length === 0) {
              applicantList.innerHTML = "<li>No applicants yet</li>";
            } else {
              applicants.forEach((applicant) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                  <strong>Name:</strong> ${applicant.name} <br>
                  <strong>Email:</strong> ${applicant.email} <br>
                  <strong>Resume Link:</strong> <a href="${applicant.resumeLink}" target="_blank">${applicant.resumeLink}</a>
                `;
                applicantList.appendChild(listItem);
              });
            }
          } catch (error) {
            console.error(`Error fetching applicants for job "${job.title}":`, error);
            const applicantList = document.getElementById(`applicants-${job._id}`);
            applicantList.innerHTML = `<li>Error fetching applicants</li>`;
          }
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        adminSection.innerHTML = "<p>Failed to load job data. Please try again later.</p>";
      }
    };
  
    // Fetch jobs and applicants on page load
    fetchJobsAndApplicants();
  });
  