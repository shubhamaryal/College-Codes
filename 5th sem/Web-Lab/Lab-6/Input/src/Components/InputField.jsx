import { useState } from "react";

const InputField = ({ type, data }) => {
  const [field, setField] = useState("");
  console.log(field)
  return (
    <div>
      <label>{type}</label>
      <input
        type={type}
        value={field}
        onChange={(e) => setField(e.target.value)}
      />
    </div>
  );
};

export default InputField;
