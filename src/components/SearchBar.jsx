import React from 'react';
import '../assets/styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, placeholder }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;