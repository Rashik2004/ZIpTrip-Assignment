const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const TODOS_FILE = path.join(__dirname, 'todos.json');

app.use(cors());
app.use(express.json());

// Read todos from file
function readTodos() {
  if (!fs.existsSync(TODOS_FILE)) {
    fs.writeFileSync(TODOS_FILE, JSON.stringify([], null, 2));
  }
  const data = fs.readFileSync(TODOS_FILE, 'utf8');
  return JSON.parse(data);
}

// Write todos to file
function writeTodos(todos) {
  fs.writeFileSync(TODOS_FILE, JSON.stringify(todos, null, 2));
}

// GET all todos
app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// GET single todo by id
app.get('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const todo = todos.find(t => t.id === req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// POST create new todo
app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  const todos = readTodos();
  const newTodo = {
    id: Date.now().toString(),
    title,
    completed,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  const { completed } = req.body;
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  todos[index].completed = completed;
  writeTodos(todos);
  res.json(todos[index]);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const index = todos.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' });
  }
  const deleted = todos.splice(index, 1)[0];
  writeTodos(todos);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});