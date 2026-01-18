const BASE_URL = "http://localhost:8080/todos";

export async function getTodos() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getTodoById(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

export async function createTodo(todo) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}
export async function updateTodo(id, todo) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  return res.json();
}

export async function deleteTodo(id) {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
}
