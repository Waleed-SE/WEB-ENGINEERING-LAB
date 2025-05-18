document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("tbody");
  const productForm = document.getElementById("productForm");

  // Function to fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const products = await response.json();

      // Clear existing rows
      tableBody.innerHTML = "";

      // Insert products into the table
      products.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-btn" data-id="${product._id}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${product._id}">Delete</button>
            </td>
          `;
        tableBody.appendChild(row);
      });

      // Add event listeners to Edit and Delete buttons
      addEventListeners();
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to handle Add Product
  const addProduct = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      // Get form data
      const name = document.getElementById("productName").value.trim();
      const category = document.getElementById("productCategory").value.trim();
      const price = document.getElementById("productPrice").value.trim();
      const description = document
        .getElementById("productDescription")
        .value.trim();

      // Validate form inputs
      if (!name || !category || !price) {
        alert("Please fill out all required fields (name, category, price).");
        return;
      }

      // Create the new product object
      const newProduct = {
        name,
        category,
        price: parseFloat(price), // Ensure price is a number
        description,
      };

      // Send the POST request to the API
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Failed to add product");

      // Show success feedback
      alert("Product added successfully!");

      // Reset the form fields
      productForm.reset();

      // Refresh the product list
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("An error occurred while adding the product. Please try again.");
    }
  };

  // Function to handle Edit button clicks
  const handleEdit = async (id) => {
    try {
      // Fetch the current product details
      const currentProductResponse = await fetch(
        `http://localhost:5000/api/products/${id}`
      );
      if (!currentProductResponse.ok)
        throw new Error("Failed to fetch current product");
      const currentProduct = await currentProductResponse.json();

      // Prompt the user for new details
      const product = prompt(
        "Enter new details (name, category, price, description) separated by commas:\n" +
          `Current details: ${currentProduct.name}, ${currentProduct.category}, ${currentProduct.price}, ${currentProduct.description}`
      );

      if (product) {
        // Split the user input into fields
        const [name, category, price, description] = product.split(",");

        // Use the current values if the user leaves any field empty
        const updatedProduct = {
          name: name?.trim() || currentProduct.name,
          category: category?.trim() || currentProduct.category,
          price: price?.trim() ? parseFloat(price) : currentProduct.price,
          description: description?.trim() || currentProduct.description,
        };

        // Send the PUT request to update the product
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        if (!response.ok) throw new Error("Failed to update product");

        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Function to handle Delete button clicks
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");

      fetchProducts(); // Refresh the product list
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Add event listeners for Edit and Delete buttons
  const addEventListeners = () => {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", () => handleEdit(button.dataset.id));
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", () => handleDelete(button.dataset.id));
    });
  };

  // Add event listener for the form submission
  productForm.addEventListener("submit", addProduct);

  // Fetch products on page load
  fetchProducts();
});
