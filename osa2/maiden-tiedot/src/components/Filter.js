import React from "react";

const Filter = ({ filterInput, handleFilterChange }) => {
  return (
    <div>
      find countries
      <input value={filterInput} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;