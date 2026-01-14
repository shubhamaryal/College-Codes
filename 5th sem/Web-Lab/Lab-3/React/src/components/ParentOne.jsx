import { Child1 } from "./Child1";
import { Child2 } from "./Child2";

export const ParentOne = () => {
  return (
    <div className="border-2 border-blue-400 p-6 m-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Parent One</h2>
      <Child1 />
      <Child2 />
    </div>
  );
};
