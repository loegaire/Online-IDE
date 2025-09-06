import React from "react";

const Output = ({ result }) => {
  const text = result ?? ''; // result is a string now
  if (!text) return <p>No result yet :d</p>;
  return (
    <div>
      <h3>Result:</h3>
      <pre>{text}</pre>
    </div>
  );
};

export default Output;