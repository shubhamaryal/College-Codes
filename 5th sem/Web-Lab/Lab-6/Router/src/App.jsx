import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Todo from "./components/Todo";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
};

export default App;
