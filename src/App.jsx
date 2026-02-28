import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./features/todoSlice";

function App() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const [todo, setTodo] = useState("");

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo(todo));
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-blue-400 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-black-500 mb-8">
        ToDo App with Redux Toolkit
      </h1>

      <form
        onSubmit={handleAddTodo}
        className="flex gap-2 mb-8 p-4 bg-white rounded-lg shadow"
      >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter a new todo..."
          className="flex-1 px-1 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          Add Todo
        </button>
      </form>

      <div className="bg-white rounded-lg shadow">
        <h2 className="text-xl font-semibold p-4 border-b border-gray-200">
          ToDo List ({todos.length})
        </h2>

        <div className="divide-y divide-gray-200">
          {todos.map((todoItem) => (
            <div
              key={todoItem.id}
              className="flex items-center justify-between p-4"
            >
              <span className="text-gray-800 flex-1">{todoItem.text}</span>
              <button
                onClick={() => handleDeleteTodo(todoItem.id)}
                className="px-4 py-2 bg-blue-400 text-white text-sm rounded hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
