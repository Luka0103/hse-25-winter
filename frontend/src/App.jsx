import { useEffect, useState } from "react";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  // 1. Initial Load
  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Failed to load todos:", err);
    }
  }

  // 2. Create Todo
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTodo({
        title,
        description: "",
        completed: false
      });
      setTitle("");
      await loadTodos();
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  }

  // 3. Update/Toggle Todo
  async function handleToggle(todo) {
    try {
      await updateTodo(todo.id, {
        title: todo.title,
        description: todo.description,
        completed: !todo.completed
      });
      await loadTodos();
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  }

  // 4. Delete Todo
  async function handleDelete(id) {
    try {
      await deleteTodo(id);
      await loadTodos();
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Todo Manager</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
          />
          <button type="submit">Add</button>
        </form>

        <ul>
          {todos.map((t) => (
            <li key={t.id} className={t.completed ? "completed" : ""}>
              <div className="checkbox" onClick={() => handleToggle(t)}>
                {t.completed && "✓"}
              </div>

              <span className="todo-content" onClick={() => handleToggle(t)}>
                {t.title}
              </span>

              <button className="btn-delete" onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p style={{ textAlign: "center", color: "var(--muted)" }}>
            No tasks yet!
          </p>
        )}
      </div>
    </div>
  );
}
