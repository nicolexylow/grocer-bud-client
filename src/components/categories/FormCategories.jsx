import React, { useState } from "react";

const FormCategories = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name);
    setName("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <button type="submit">Create Category</button>
    </form>
  );
};

export default FormCategories;

