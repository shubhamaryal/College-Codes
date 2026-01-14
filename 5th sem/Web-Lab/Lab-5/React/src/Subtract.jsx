import { useState } from "react";

const Subrtact = ({ a, b }) => {

  const show = () => {
    console.log(a + b);
  };

  // function show() {
  //   console.log(a + b)
  // }

  const [state, setState] = useState();

  return (
    <>
      <div>
        The difference between {a} and {b} is: {a - b}
      </div>
      <button onClick={() => show()}>Show</button>

      <h1>The difference is: {state}</h1>
      <button onClick={() => setState(a + b)}>Click to execute</button>
    </>
  );
};

export default Subrtact;
