// Array to store tasks
const taskList = [];

// Add task function
function addTask() {
  const name = document.getElementById('taskName').value;
  const deadline = document.getElementById('deadline').value;
  const effort = document.getElementById('effort').value;

  // Validate inputs
  if (!name || !deadline || !effort) {
    alert('Please fill all fields!');
    return;
  }

  // Add task to array
  const task = { name, deadline, effort };
  taskList.push(task);

  // Clear inputs
  document.getElementById('taskName').value = '';
  document.getElementById('deadline').value = '';
  document.getElementById('effort').value = '';

  // Render tasks
  renderTasks();
}

// Render tasks on the page
function renderTasks() {
  const container = document.getElementById('taskList');
  container.innerHTML = '';

  taskList.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
      <strong>${task.name}</strong><br>
      Deadline: ${task.deadline} – Effort: ${task.effort} hrs
    `;
    container.appendChild(div);
  });
}

// Add event listener to button
document.getElementById('addTaskBtn').addEventListener('click', addTask);
