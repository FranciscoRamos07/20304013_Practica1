const express = require("express");
const bodyParser = require("body-parser");
const tasksRepository = require("./taskRepository");

// otro cambio prron
const app = express();
const port = 3000;

app.use(bodyParser.json());

let tasks = [
  { id: 1, title: "Task 1", description: "Do something" },
  { id: 2, title: "Task 2", description: "Do something else" },
];

// Get all tasks
app.get("/tasks", (req, res) => {
  const tasks = tasksRepository.getAll();
  res.json(tasks);
});

// Get a specific task
app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasksRepository.getById(taskId);

  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Create a new task
app.post("/tasks", (req, res) => {
  const newTask = req.body;
  tasksRepository.createTask(newTask);
  res.status(201).json(newTask);
});

// Update a task
app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = req.body;
  const task = tasksRepository.updateTask(taskId, updatedTask);

  if (task != null) {
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasksRepository.deleteTask(taskId);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
