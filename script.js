document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.toggle("completed", task.completed);

      li.innerHTML = `
                <span>${task.name} - ${new Date(
        task.time
      ).toLocaleString()}</span>
                <div>
                    <button class="complete" onclick="toggleComplete(${index})">&#x2713;</button>
                    <button class="edit" onclick="editTask(${index})">&#x270E;</button>
                    <button class="delete" onclick="deleteTask(${index})">&#x1F5D1;</button>
                </div>
            `;

      taskList.appendChild(li);
    });
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskName = document.getElementById("task-name").value;
    const taskTime = document.getElementById("task-time").value;
    tasks.push({ name: taskName, time: taskTime, completed: false });
    saveTasks();
    renderTasks();
    taskForm.reset();
  });

  window.toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  window.editTask = (index) => {
    const newName = prompt("Edit task name:", tasks[index].name);
    const newTime = prompt("Edit task time:", tasks[index].time);
    if (newName && newTime) {
      tasks[index].name = newName;
      tasks[index].time = newTime;
      saveTasks();
      renderTasks();
    }
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  };

  renderTasks();
});
