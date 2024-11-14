import React from "react";

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <input
        type="text"
        placeholder="Enter city name..."
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-2 mb-2 border rounded-md"
      />
    </div>
  );
};

export default Location;
