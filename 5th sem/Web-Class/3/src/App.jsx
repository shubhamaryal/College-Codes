import { useState } from "react";

export default function MyApp() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount(count + 1);
  };
  const decreaseCount = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h1>The count is : {count}</h1>
      <MyButton onClick={increaseCount} text="Increase" />
      <MyButton onClick={decreaseCount} text="Decrease" />
    </div>
  );
}

function MyButton({ onClick, text }) {
  return <button onClick={onClick}>{text} the count.</button>;
}
