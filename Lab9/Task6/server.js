const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Blog = require("./Model/Blog");

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
app.get("/api/blogs", async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.get("/api/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).send("Blog not found");
  res.json(blog);
});

app.post("/api/blogs", async (req, res) => {
  const blog = new Blog(req.body);
  await blog.save();
  res.json(blog);
});

// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
