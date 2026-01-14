import { useState } from "react";
import InputField from "./Components/InputField";
const App = () => {
  const [count, setCount] = useState(0);

  const incre = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div>The count is : {count}</div>
      <button onClick={() => incre()}>Click</button>
      <br />
      <InputField type={"email"} data={"email"} />
      <InputField type={"Number"} data={"Number"} />
      <InputField type={"Password"} data={"Password"} />
    </>
  );
};

export default App;
