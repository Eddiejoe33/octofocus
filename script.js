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

  // Send tasks to backend for AI prioritization
  sendTasksToBackend();
}

// Send tasks to Flask backend
async function sendTasksToBackend() {
  const response = await fetch('http://10.152.233.210:5000/prioritize', {  // <-- Replace with your Flask IP
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tasks: taskList })
  });

  const data = await response.json();
  renderTasksWithAI(data);
}

// Render AI-ranked tasks on the page
function renderTasksWithAI(tasks) {
  const container = document.getElementById('taskList');
  container.innerHTML = '';

  tasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
      <strong>${task.name}</strong><br>
      Deadline: ${task.deadline} – Effort: ${task.effort} hrs<br>
      <em>${task.explanation}</em>
    `;
    container.appendChild(div);
  });
}

// Add event listener to Add Task button
document.getElementById('addTaskBtn').addEventListener('click', addTask);
