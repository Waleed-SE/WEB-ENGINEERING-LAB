const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for MongoDB connection
const Student = require("./Model/Student"); // Import Student model
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = "mongodb://localhost:27017/WebLab9";

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => console.log("MongoDB Connection Error:", err));

// GET /api/students/check-email/:email → Check if email exists
app.get("/api/students/check-email/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const student = await Student.findOne({ email });
    if (student) {
      return res.json({ exists: true });
    }
    res.json({ exists: false });
  } catch (err) {
    console.error("Error checking email:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/students/register → Register student
app.post("/api/students/register", async (req, res) => {
  try {
    const { name, email, password, department } = req.body;

    // Create and save the new student
    const newStudent = new Student({ name, email, password, department });
    await newStudent.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Error registering student:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
