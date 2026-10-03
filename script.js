const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const tasks = [];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;
    taskText.style.textDecoration = task.completed ? 'line-through' : 'none';

    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      taskText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
    });

    const deleteButton = document.createElement('button');
    // trash bin seems to be a better idea than X 
    deleteButton.textContent = '🗑';            
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();

  if (task) {
    tasks.push({ text: task, completed: false });
    taskInput.value = '';
    renderTasks();
  }
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

renderTasks();
