import { useContext, useRef, useState } from "react"
import { TodoContext } from "./TodoContextManager";

const AddItemSection = () => {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("ContextManager is null");
  }

  const { handleAddTodo } = context;
  const [todoName, setTodoName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addInput = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    console.log("alma")
    e.preventDefault();
    const result = handleAddTodo(todoName);

    if (result instanceof Error) {
      setError(result.message);
      console.log(result.message)
    } else {
      setTodoName('');
      setError(null);
    }

    addInput.current?.focus();
  }


  return (
    <section className="w-full bg-blue-800 text-white py-4">

      <div className="flex flex-col items-center space-y-4 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold">Add New Todo</h1>

        <form onSubmit={handleSubmit} className="flex flex-row flex-nowrap gap-4 w-full justify-center">
          <input ref={addInput} type="text" className="bg-white w-full max-w-2xl px-4 py-2 border-2 border-black rounded-md text-xl text-black" placeholder="Add new Todo..." value={todoName} onChange={e => setTodoName(e.target.value)} />
          <button type="submit" className="min-w-fit px-4 py-3 bg-red-400 hover:bg-red-500 cursor-pointer rounded-md font-semibold">Add Todo</button>
        </form>
        {error && (
          <p className="text-red-300" role="alert">
            {error}
          </p>
        )}

      </div>
    </section>
  )
}

export default AddItemSection