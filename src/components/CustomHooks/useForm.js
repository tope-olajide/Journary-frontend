import { useState } from "react";
const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);
  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  return {
    inputs,
    handleChange
  };
};
export default useForm;
