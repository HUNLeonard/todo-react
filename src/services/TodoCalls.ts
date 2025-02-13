import { TodoItemType } from "../interfaces/interfaces";

const TODO_STORAGE_KEY = "todos";

export function getTodos(query = "") {
  const data: TodoItemType[] = JSON.parse(
    localStorage.getItem(TODO_STORAGE_KEY) || "[]",
  );
  return query
    ? data.filter((todo) =>
        todo.name.toLowerCase().includes(query.toLowerCase()),
      )
    : data;
}
export function addTodo(newTodoName: TodoItemType["name"]) {
  let error = "";

  if (newTodoName.trim().length === 0) {
    //throw new Error("Please give a name to your todos");
    error = "Please give a name to your todo!";
    return error;
  }
  const newTodo: TodoItemType = {
    id: crypto.randomUUID(),
    name: newTodoName,
    completed: false,
  };

  const currentTodos = getTodos();
  saveTodos([...currentTodos, newTodo]);

  return newTodo;
}

export function updateTodo(updatedTodo: TodoItemType) {
  const currentTodos = getTodos();
  const updatedTodos = currentTodos.map((todo) =>
    todo.id === updatedTodo.id ? { ...updatedTodo } : todo,
  );

  saveTodos(updatedTodos);
  return updatedTodo;
}

export function deleteTodo(deleteTodoId: TodoItemType["id"]) {
  const currTodos = getTodos();
  const newTodos = currTodos.filter((todo) => todo.id !== deleteTodoId);

  saveTodos(newTodos);

  return deleteTodoId;
}

export function saveTodos(todos: TodoItemType[]) {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
}
