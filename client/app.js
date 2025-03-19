const API_URL = "http://localhost:3000"; 
const todoList = document.getElementById("todoList");
const addTodoButton = document.getElementById("addTodo");

// Function to Fetch All Todos
const fetchTodos = async () => {
  try {
    const res = await fetch(`${API_URL}/alltodos`);
    const data = await res.json();
    displayTodos(data.data);
  } catch (error) {
    console.error("Error fetching todos:", error);
    alert("Failed to fetch todos. Please try again later.");
  }
};

// Function to Display Todos
const displayTodos = (todos) => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
            <span><strong>${sanitize(todo.title)}</strong>: ${sanitize(
      todo.description
    )}</span>
            <div>
                <button class="update-btn" onclick="openUpdatePopup('${
                  todo._id
                }', '${sanitize(todo.title)}', '${sanitize(
      todo.description
    )}')">Update</button>
                <button class="delete-btn" onclick="deleteTodo('${
                  todo._id
                }')">Delete</button>
            </div>
        `;
    todoList.appendChild(li);
  });
};

// Function to Add New Todo
addTodoButton.addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title || !description) {
    alert("Both title and description are required!");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/createtodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      fetchTodos();
    } else {
      throw new Error("Failed to add todo");
    }
  } catch (error) {
    console.error("Error adding todo:", error);
    alert("Failed to add todo. Please try again later.");
  }
});

// Function to Delete Todo
const deleteTodo = async (id) => {
  if (!confirm("Are you sure you want to delete this todo?")) return;

  try {
    const res = await fetch(`${API_URL}/delete/${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchTodos();
    } else {
      throw new Error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    alert("Failed to delete todo. Please try again later.");
  }
};

// Function to Open Update Popup
const openUpdatePopup = async (id, title, description) => {
  const newTitle = prompt("Update Title:", title);
  const newDescription = prompt("Update Description:", description);

  if (newTitle !== null && newDescription !== null) {
    updateTodo(id, newTitle, newDescription);
  }
};

// Function to Update Todo
const updateTodo = async (id, title, description) => {
  try {
    const res = await fetch(`${API_URL}/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      fetchTodos();
    } else {
      throw new Error("Failed to update todo");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    alert("Failed to update todo. Please try again later.");
  }
};

// Function to Sanitize User Input
const sanitize = (str) => {
  const temp = document.createElement("div");
  temp.textContent = str;
  return temp.innerHTML;
};

window.onload = fetchTodos;
