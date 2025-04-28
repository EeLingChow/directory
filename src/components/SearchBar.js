import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap justify-center bg-blue-50 pt-20 px-4">
      <input
        type="text"
        placeholder="Search stores..."
        className="p-2 border border-gray-300 rounded w-full md:w-64"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;