import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const addTodo = () => {
    if (input === "") return;
    console.log("Todo added:", input);
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index) => {
    console.log("Todo deleted:", todos[index]);
    const newTodos = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl text-center mb-4">My Todos</h1>

        <button
          onClick={() => navigate("/")}
          className="w-full border p-2 rounded mb-6 cursor-pointer"
        >
          Go to Home
        </button>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={addTodo}
            className="bg-gray-800 text-white px-4 rounded cursor-pointer"
          >
            Add
          </button>
        </div>

        <ul>
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 mb-2 bg-gray-50 rounded"
            >
              <span>{todo}</span>
              <button
                onClick={() => deleteTodo(index)}
                className="text-red-500 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
