import { useState } from "react";

const Todo = () => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState();

  const addData = () => {
    setItems([...items, { id: data }]);
  };
  return (
    <>
      <div>Todo</div>
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={addData}>Add</button>
      {items.map((item, index) => (
        <li key={index}>{item.id}</li>
      ))}
    </>
  );
};

export default Todo;
