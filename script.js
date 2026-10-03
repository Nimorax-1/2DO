const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');
const videoPopup = document.getElementById('videoPopup');
const actionVideo = document.getElementById('actionVideo');

const tasks = [];

function playVideo(fileName) {
  actionVideo.src = fileName;
  videoPopup.style.display = 'flex';
  actionVideo.play();
}

actionVideo.addEventListener('ended', () => {
  videoPopup.style.display = 'none';
});

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

      if (checkbox.checked) {
        playVideo('complete.mp4');
      }
    });

    const deleteButton = document.createElement('button');
    // trash bin seems to be a better idea than X 
    deleteButton.textContent = '🗑';            
    deleteButton.addEventListener('click', () => {
      playVideo('delete.mp4');
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
    playVideo('add.mp4');
  }
});

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTaskButton.click();
  }
});

renderTasks();
