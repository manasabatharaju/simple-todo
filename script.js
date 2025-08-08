// Load tasks from local storage on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("todos")) || [];
  savedTasks.forEach(task => {
    createTodo(task.text, task.completed,task.date);
  });
};

function addTodo() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  const dateInput = document.getElementById("todo-date");
  const date = dateInput.value;
  


  if (task === "") return;

  createTodo(task, false, date );
  saveTodos();
  input.value = "";
  

}

function createTodo(text,completed, date) {
  const list = document.getElementById("todo-list");
  const item = document.createElement("li");
  


  item.textContent = text;
  if (date) {
    const dateSpan = document.createElement("span");
    dateSpan.textContent = " (Due: " + date + ")";
    dateSpan.style.color = "gray";
    dateSpan.style.marginLeft = "10px";
    item.appendChild(dateSpan);
  }
  

  if (completed) {
    item.classList.add("completed");
  }

  item.onclick = () => {
    item.classList.toggle("completed");
    saveTodos();
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.onclick = () => {
    item.remove();
    saveTodos();
  };

  item.appendChild(deleteBtn);
  list.appendChild(item);
}

function saveTodos() {
  const items = document.querySelectorAll("#todo-list li");
  const todos = [];

  items.forEach(item => {
    const text = item.firstChild.textContent;
    const dateSpan = item.querySelector("span");
    const date = dateSpan ? dateSpan.textContent.replace(" (Due: ", "").replace(")", "") : "";
    const completed = item.classList.contains("completed");
    

   
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
function filterTodos(type) {
  const items = document.querySelectorAll("#todo-list li");

  items.forEach(item => {
    const isCompleted = item.classList.contains("completed");

    if (type === "all") {
      item.style.display = "block";
    } else if (type === "completed") {
      item.style.display = isCompleted ? "block" : "none";
    } else if (type === "pending") {
      item.style.display = isCompleted ? "none" : "block";
    }
  });
}

