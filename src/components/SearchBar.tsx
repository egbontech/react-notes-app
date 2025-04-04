import React from "react";
import { BiSearch } from "react-icons/bi";

interface SearchBarInterface {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function SearchBar({ setSearchQuery, searchQuery }: SearchBarInterface) {
  return (
    <div className="flex">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        className="bg-blue-200 rounded-full outline-none p-3 flex-grow placeholder-gray-600"
        placeholder="Search for notes..."
      />
    </div>
  );
}

export default SearchBar;
