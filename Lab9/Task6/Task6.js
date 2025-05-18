document.addEventListener("DOMContentLoaded", () => {
  const blogForm = document.getElementById("blogForm");
  const blogList = document.getElementById("blogList");

  // Fetch and display blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const blogs = await response.json();

      blogList.innerHTML = ""; // Clear the list
      blogs.forEach((blog) => addBlogToDOM(blog));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // Add a blog to the DOM
  const addBlogToDOM = (blog) => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
        <div class="blog-card p-3">
          <h3 class="card-title">${blog.title}</h3>
          <p><strong>Author:</strong> ${blog.author}</p>
          <p class="card-content">${blog.content}</p>
          <button class="btn btn-link read-more-btn" data-id="${blog._id}">Read More</button>
        </div>
      `;

    col
      .querySelector(".read-more-btn")
      .addEventListener("click", () => viewBlog(blog._id));
    blogList.appendChild(col);
  };

  // View full blog content
  const viewBlog = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
      if (!response.ok) throw new Error("Failed to fetch blog");
      const blog = await response.json();

      alert(`Title: ${blog.title}\nAuthor: ${blog.author}\n\n${blog.content}`);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // Add a new blog
  blogForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const blogData = {
      title: document.getElementById("blogTitle").value.trim(),
      author: document.getElementById("blogAuthor").value.trim(),
      content: document.getElementById("blogContent").value.trim(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!response.ok) throw new Error("Failed to add blog");

      const newBlog = await response.json();
      addBlogToDOM(newBlog);
      blogForm.reset();
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  });

  // Initial fetch
  fetchBlogs();
});
