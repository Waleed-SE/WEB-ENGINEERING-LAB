const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for MongoDB connection
const Feedback = require("./Model/Feedback"); // Import Feedback model
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(cors()); // Enable cross-origin requests

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/WebLab9";

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));

// POST /api/feedback → Submit feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create and save the new feedback entry
    const newFeedback = new Feedback({ name, email, message });
    await newFeedback.save();

    res.status(201).json({ success: true, feedback: newFeedback });
  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/feedback → Get all feedback
app.get("/api/feedback", async (req, res) => {
  try {
    // Retrieve all feedback entries from the database
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (err) {
    console.error("Error fetching feedback:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /api/feedback/check-email/:email → Check if email exists in feedback
app.get("/api/feedback/check-email/:email", async (req, res) => {
  try {
    const email = req.params.email; // Extract email from URL parameters
    const feedback = await Feedback.findOne({ email });

    if (feedback) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
