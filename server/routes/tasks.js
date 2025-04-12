const express = require('express');
const fs = require('fs');
const router = express.Router();
const filePath = './data/tasks.json';

const readTasks = () => JSON.parse(fs.readFileSync(filePath));
const writeTasks = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

router.get('/', (req, res) => res.json(readTasks()));

router.post('/', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});

router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.completed = true;
  writeTasks(tasks);
  res.json(task);
});

router.delete('/:id', (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id != req.params.id);
  writeTasks(tasks);
  res.json({ success: true });
});

module.exports = router;