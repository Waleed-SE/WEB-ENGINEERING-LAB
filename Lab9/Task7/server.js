const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./Model/User");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/WebLab9", {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Routes
// POST /api/login - Verify credentials
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).send("Invalid credentials");
    }

    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// GET /api/user/:id - Get user data
app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
