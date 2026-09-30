const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const tasks = [
];

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

addTaskButton.addEventListener('click', () => {
  const task = taskInput.value.trim();

  if (task) {
    tasks.push(task);
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
