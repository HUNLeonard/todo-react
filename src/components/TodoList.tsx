import { useContext } from 'react'
import { TodoContext } from './TodoContextManager'
import TodoItem from './TodoItem';

const TodoList = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("ContextManager is null");
  }
  const { filteredTodoList, setFilterType } = context;

  return (
    <section className='bg-amber-200 min-h-screen p-2 sm:px-4 lg:px-8'>
      <div className='max-w-full lg:max-w-3/4 mx-auto'>
        <div className='flex flex-col sm:flex-row sm:justify-between max-sm:gap-4 items-center py-6 lg:py-8'>
          <h2 className='text-4xl font-bold'>Todo List</h2>
          <div className='flex flex-row justify-center flex-wrap gap-2'>
            <button className='py-3 px-2 bg-yellow-300 rounded-md w-32 font-semibold hover:font-bold hover:bg-[rgb(255,196,19)] cursor-pointer whitespace-nowrap' onClick={() => setFilterType(null)}>All</button>
            <button className='py-3 px-2 bg-green-300 rounded-md w-32 font-semibold hover:font-bold hover:bg-green-400 cursor-pointer whitespace-nowrap' onClick={() => setFilterType(true)}>Completed</button>
            <button className='py-3 px-2 bg-red-300 rounded-md w-32 font-semibold hover:font-bold hover:bg-red-400 cursor-pointer whitespace-nowrap' onClick={() => setFilterType(false)}>Not Completed</button>
          </div>
        </div>
        <div>
          {filteredTodoList.length === 0 && <p className='text-xl text-gray-500 font-bold'>There's no todo here 😁!</p>}
          {filteredTodoList.map(todo =>
            <TodoItem key={todo.id} todo={todo} />
          )}
        </div>
      </div>
    </section>
  )
}

export default TodoList