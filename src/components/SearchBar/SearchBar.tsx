import { useState } from "react";
import { ReactComponent as SearchIcon } from "./icon.svg";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for: ", query);
  };

  const handleKeyDown = (e) => {
    if (e.key == "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <SearchIcon />
      <input
        type={"text"}
        placeholder={"Search..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={"bg-gray-200 rounded-full py-2 px-4"}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchBar;
