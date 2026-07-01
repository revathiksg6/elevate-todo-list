const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const taskList = document.getElementById('taskList');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateCounts() {
  totalCount.textContent = tasks.length;
  completedCount.textContent = tasks.filter(task => task.completed).length;
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((taskObj, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    if (taskObj.completed) {
      li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = taskObj.text;

    span.addEventListener('click', () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = 'Delete';

    delBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateCounts();
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  tasks.push({ text: task, completed: false });
  saveTasks();
  renderTasks();

  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

clearAllBtn.addEventListener('click', () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

renderTasks();
