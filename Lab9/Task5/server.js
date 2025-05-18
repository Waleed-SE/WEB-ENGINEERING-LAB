const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Task = require("./Model/Task");
const cors = require("cors")

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
app.get("/api/todos", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/todos", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.put("/api/todos/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(task);
});

app.delete("/api/todos/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
