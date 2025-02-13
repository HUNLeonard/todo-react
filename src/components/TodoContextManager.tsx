import { createContext, useCallback, useEffect, useState } from "react";
import { TodoContextType, TodoItemType } from "../interfaces/interfaces";
import { addTodo, deleteTodo, getTodos, saveTodos, updateTodo } from "../services/TodoCalls";

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoContextManager = ({ children }: { children: React.ReactNode }) => {
  const [todoList, setTodoList] = useState<TodoItemType[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<TodoItemType[]>([]);
  const [filterType, setFilterType] = useState<boolean | null>(null);

  useEffect(() => {
    setFilteredTodoList(
      todoList.filter((todo) => filterType === null || todo.completed === filterType)
    );
  }, [todoList, filterType])

  const handleAddTodo = useCallback((name: TodoItemType['name']) => {
    let result = addTodo(name);
    if (typeof result === "string") {
      return new Error(result);
    }

    setTodoList(prev => [...prev, result]);
    return result;
  }, []);

  const handleUpdateTodo = useCallback((todo: TodoItemType) => {
    let result = updateTodo(todo);
    if (typeof result === "string") {
      return result;
    }
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === result.id ? result : todo)),
    );
    return result;
  }, []);

  const handleDeleteTodo = useCallback((dTodoId: TodoItemType["id"]) => {
    let result = deleteTodo(dTodoId);
    setTodoList(prev => prev.filter((todo) => todo.id !== result));

    return result;
  }, []);

  const handleMoveTodo = (way: 'up' | 'down', id: string) => {
    const index = filteredTodoList.findIndex(todo => todo.id === id);

    if (index === -1 ||
      (way === 'up' && index === 0) ||
      (way !== 'up' && index === filteredTodoList.length - 1)) { return; }

    const currTodo = [...todoList];

    const nindex = currTodo.findIndex(todo => todo.id === id);
    const findex = currTodo.findIndex(todo => todo.id === filteredTodoList[index + (way === 'up' ? -1 : 1)].id);

    [currTodo[nindex], currTodo[findex]] = [currTodo[findex], currTodo[nindex]]
    setTodoList(currTodo);
    saveTodos(currTodo);
  }

  useEffect(() => {
    setTodoList(getTodos());
  }, []);


  return (
    <TodoContext.Provider
      value={{
        filteredTodoList,
        setFilterType,
        handleAddTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleMoveTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContextManager;
