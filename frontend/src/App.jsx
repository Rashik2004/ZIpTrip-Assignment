import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/todos')
      .then(res => res.json())
      .then(setTodos)
      .catch(() => setError('Failed to load todos'));
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTodo, completed: false }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to create');
        setNewTodo('');
        fetch('/api/todos').then(r => r.json()).then(setTodos);
      })
      .catch(() => setError('Failed to create todo'));
  };

  const handleToggle = (id) => {
    fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todos.find(t => t.id === id).completed }),
    })
      .then(() => fetch('/api/todos').then(r => r.json()).then(setTodos))
      .catch(() => setError('Failed to update'));
  };

  const handleDelete = (id) => {
    fetch(`/api/todos/${id}`, { method: 'DELETE' })
      .then(() => fetch('/api/todos').then(r => r.json()).then(setTodos))
      .catch(() => setError('Failed to delete'));
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">T</div>
        <h1 className="page-title">Todo Tracker</h1>
        <p className="page-subtask">Manage your tasks in one place</p>
      </header>

      <main className="main-content">
        {error && <p className="error" style={{ color: '#ff4757', marginBottom: '1rem', marginTop: '1rem' }}>{error}</p>}

        <section className="card fade-in-up">
          <form onSubmit={handleCreate} className="form-group">
            <input
              type="text"
              className="input-field"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
            />
            <button type="submit" className="btn-submit">Add Todo</button>
          </form>
        </section>

        {todos.length === 0 && <p className="empty-state">No todos yet. Add one above!</p>}

        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? 'todo-item completed' : 'todo-item'}
              style={{ animationDelay: `${todos.indexOf(todo) * 0.1}s` }}
            >
              <span className="todo-text">{todo.title}</span>
              <div className="todo-actions">
                <button
                  className="btn-action"
                  onClick={() => handleToggle(todo.id)}
                >
                  {todo.completed ? 'Undo' : 'Done'}
                </button>
                <button className="btn-action delete" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function SingleTodo() {
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const path = new URL(location.href).pathname;
    const id = path.split('/').pop();
    if (id) {
      fetch(`/api/todos/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.json();
        })
        .then(setTodo)
        .catch(() => setError('Todo not found'));
    } else {
      setError('No todo ID provided');
    }
  }, [location.href]);

  if (!todo) {
    return (
      <div className="card fade-in-up">
        {error && <p style={{ color: '#ff4757', marginBottom: '1rem', marginTop: '1rem' }}>{error}</p>}
        <p>Loading todo...</p>
      </div>
    );
  }

  return (
    <section className="single-todo-page fade-in-up">
      <div className="single-todo">
        <h2>{todo.title}</h2>
        <div className={`status ${todo.completed ? 'completed' : 'pending'}`}>
          {todo.completed ? 'Completed' : 'Pending'}
        </div>
        <p>Created: {new Date(todo.createdAt).toLocaleDateString()}</p>
        <button className="back-btn" onClick={() => window.history.back()}>Back to List</button>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:id" element={<SingleTodo />} />
      </Routes>
    </Router>
  );
}
