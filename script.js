const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
  const task = taskInput.value.trim();
  if (!task) return;

  const li = document.createElement('li');
  li.className = 'task-item';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const delBtn = document.createElement('button');
  delBtn.className = 'delete-btn';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
