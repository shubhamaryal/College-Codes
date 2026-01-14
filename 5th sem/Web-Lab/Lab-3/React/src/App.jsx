import { ParentOne } from "./components/ParentOne";
import { ParentTwo } from "./components/ParentTwo";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ParentOne />
      <ParentTwo />
    </div>
  );
};

export default App;
