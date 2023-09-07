import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { SearchInputProps } from "@types";

const DEBOUNCE_TIMEOUT = 200;

export const SearchInput: React.FC<SearchInputProps> = ({
  params,
  setParams,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const debouncedSearch = debounce((value: string) => {
    setParams({ ...params, address_like: value });
  }, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");

    setParams({ ...params, _page: 1, address_like: "" });
    debouncedSearch.cancel();
  };

  return (
    <div className="w-full md:w-1/3 relative">
      <input
        type="text"
        placeholder="Search Location by Address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border rounded-md border-gray-300 px-4 py-2 focus-visible:outline-none focus:border-cyan-700"
      />
      {searchQuery && (
        <button
          onClick={handleClearSearch}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 text-cyan-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
