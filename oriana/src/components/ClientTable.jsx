import React from "react";

const SearchFilter = ({ searchTerm, onSearchChange, onExport }) => {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search clients..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button className="secondary" onClick={onExport}>
        Export Data
      </button>
    </div>
  );
};

export default SearchFilter;
