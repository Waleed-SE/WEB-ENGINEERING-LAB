const express = require("express");
const mongoose = require("mongoose"); // Import mongoose for MongoDB connection
const Product = require("./Model/Product"); // Import Product model
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

// GET /api/products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET /api/products/:id
app.get("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extract the product ID from the request parameters

    // Find the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" }); // Respond with 404 if the product is not found
    }

    res.json(product); // Return the product in the response
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ error: "Internal Server Error" }); // Handle server errors gracefully
  }
});

// POST /api/products
app.post("/api/products", async (req, res) => {
  try {
    const { name, category, price, description } = req.body;

    const newProduct = new Product({ name, category, price, description });
    await newProduct.save();

    res.json({ success: true, product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT /api/products/:id
app.put("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extract the product ID from the request parameters
    const { name, category, price, description } = req.body; // Extract the updated product fields

    // Find the product by ID and update it with the provided data
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, category, price, description },
      { new: true, runValidators: true } // Return the updated document and validate the fields
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, product: updatedProduct }); // Return the updated product
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE /api/products/:id
app.delete("/api/products/:id", async (req, res) => {
  try {
    const id = req.params.id; // Extract the product ID from the request parameters

    // Find the product by ID and delete it
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
