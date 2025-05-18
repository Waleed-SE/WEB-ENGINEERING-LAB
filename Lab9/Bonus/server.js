const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Event = require("./Model/Event");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/WebLab9", {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// POST /api/events - Save event details
app.post("/api/events", async (req, res) => {
  try {
    console.log("hhh");
    const event = new Event(req.body);
    await event.save();
    res.json({ eventId: event._id });
  } catch (error) {
    res.status(500).send("Error saving event data");
  }
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
