const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Job = require("./Model/Job");
const Applicant = require("./Model/Applicant")

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/WebLab9", {})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// GET /api/jobs → Fetch all jobs
app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/apply → Submit an application
app.post("/api/apply", async (req, res) => {
  try {
    const { jobId, name, email, resumeLink } = req.body;
    const newApplicant = new Applicant({ jobId, name, email, resumeLink });
    await newApplicant.save();
    res.status(201).json({ success: true, applicant: newApplicant });
  } catch (err) {
    console.error("Error submitting application:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/applicants/:jobId → List applicants for a job
app.get("/api/applicants/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const applicants = await Applicant.find({ jobId }).populate("jobId");
    res.json(applicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/applicants", async (req, res) => {
  try {
    // Fetch all applicants with job details populated
    const applicants = await Applicant.find().populate("jobId", "title description");
    if (applicants.length === 0) {
      return res.status(404).json({ error: "No applicants found" });
    }

    res.json(applicants); // Respond with all applicants data
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
