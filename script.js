const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounts() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(task => task.completed).length;
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    span.addEventListener("click", function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  updateCounts();
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

clearAllBtn.addEventListener("click", function () {
  tasks = [];
  saveTasks();
  renderTasks();
});

renderTasks();
