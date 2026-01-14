import { Child3 } from "./Child3";
import { Child4 } from "./Child4";

export const ParentTwo = () => {
  return (
    <div className="border-2 border-green-400 p-6 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Parent Two</h2>
      <Child3 />
      <Child4 />
    </div>
  );
};
