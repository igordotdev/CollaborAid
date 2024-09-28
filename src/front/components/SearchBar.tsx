import React, { useState } from "react";

interface SearchBarProps {
  styling: string;
}

const SearchIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-400"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
};

export const SearchBar: React.FC<SearchBarProps> = ({ styling }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for: ", query);
  };

  const handleKeyDown = (e: React.KeyboardEventHandler<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styling}>
      <div className="px-3 py-3 flex items-center bg-gray-200 rounded-full">
        <div>
          <SearchIcon />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="ml-3 w-full bg-transparent outline-none text-gray-600 placeholder-gray-400"
          onKeyDown={handleKeyDown}
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
      </div>
    </div>
  );
};
