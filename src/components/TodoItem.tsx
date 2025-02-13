import { useContext, useRef } from 'react'
import { useAsyncAction } from '../hooks/useAsyncAction'
import { TodoItemType } from '../interfaces/interfaces'
import { TodoContext } from './TodoContextManager';

const TodoItem = ({ todo }: { todo: TodoItemType }) => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("ContextManager is null");
  }
  const { handleUpdateTodo, handleDeleteTodo, handleMoveTodo } = context;
  const todoElem = useRef<HTMLDivElement | null>(null)

  const { isLoading: isStatusLoading, execute: executeUpdate } = useAsyncAction(
    async () => handleUpdateTodo({ ...todo, completed: !todo.completed })
  );

  const { isLoading: isDeleteLoading, execute: executeDelete } = useAsyncAction(
    async () => handleDeleteTodo(todo.id)
  );

  const deleteItem = async () => {
    if (!todoElem.current) return;
    todoElem.current.classList.add("opacity-0", "select-none", "cursor-default", "overflox-y-hidden", "!max-h-0", "!my-0");
    await new Promise(resolve => setTimeout(resolve, 1000));
    executeDelete();
  }

  const isLoading = (isStatusLoading || isDeleteLoading);


  return (
    <div ref={todoElem} className={`my-2 flex flex-row flex-nowrap w-full justify-between gap-4 items-center max-h-64 overflow-y-hidden transition-all duration-1000`}>

      <button name={todo.name}
        className={`p-2 w-8 h-8 cursor-pointer hover: ${isStatusLoading ? 'bg-gray-300' : todo.completed ? 'bg-green-300 hover:bg-green-400' : 'bg-amber-300 hover:bg-amber-400'} border-2 border-black rounded-md flex justify-center items-center overflow-hidden`}
        onClick={executeUpdate}
        disabled={isLoading}
        aria-label={`Mark todo as ${todo.completed ? 'incomplete' : 'complete'}`}
      >
        <span className='font-bo'>{isStatusLoading ? '...' : todo.completed ? '✓' : `✕`}</span>
      </button>
      <p title={todo.name} className='flex-1 text-lg text-left'>{todo.name}</p>
      <div className='flex flex-row gap-2'>
        <button className='px-3 py-2 rounded-md cursor-pointer bg-blue-400 hover:bg-blue-500 text-white' onClick={() => handleMoveTodo('up', todo.id)}>↑</button>
        <button className='px-3 py-2 rounded-md cursor-pointer bg-blue-400 hover:bg-blue-500 text-white' onClick={() => handleMoveTodo('down', todo.id)}>↓</button>
        <button onClick={() => deleteItem()}
          disabled={isLoading}
          className={`bg-gray-400 w-fit px-3 py-2 rounded-md overflow-hidden cursor-pointer 
          disabled:cursor-not-allowed not-disabled:hover:bg-gray-500 not-disabled:hover:[text-shadow:_0_0_1px_rgba(0,0,0,1)]
          whitespace-nowrap`}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem