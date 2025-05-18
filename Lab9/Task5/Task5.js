document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const tasks = await response.json();

      taskList.innerHTML = ""; // Clear the list
      tasks.forEach((task) => {
        addTaskToDOM(task);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new task to the DOM
  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center ${
      task.completed ? "done" : ""
    }`;
    li.dataset.id = task._id;

    const taskContent = document.createElement("span");
    taskContent.textContent = task.name;
    taskContent.contentEditable = false;
    taskContent.className = "task-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () =>
      toggleTaskStatus(task._id, checkbox.checked)
    );

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-sm btn-warning me-2";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => editTask(task._id, taskContent));

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task._id));

    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  };

  // Add a new task
  const addTask = async () => {
    const taskName = taskInput.value.trim();
    if (!taskName) return;

    try {
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
      });

      if (!response.ok) throw new Error("Failed to add task");
      const newTask = await response.json();
      addTaskToDOM(newTask);
      taskInput.value = ""; // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task status
  const toggleTaskStatus = async (taskId, completed) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });

      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error toggling task status:", error);
    }
  };

  // Edit a task
  const editTask = async (taskId, taskContent) => {
    const newName = prompt("Edit the task:", taskContent.textContent);
    if (!newName) return;

    try {
      await fetch(`http://localhost:5000/api/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error editing task:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${taskId}`, { method: "DELETE" });
      fetchTasks(); // Refresh task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Event listeners
  addTaskBtn.addEventListener("click", addTask);

  // Initial fetch
  fetchTasks();
});
