import React from "react";

interface FilterItemProps {
  title: string;
  styling: string;
}

export const FilterItem: React.FC<FilterItemProps> = ({ title, styling }) => {
  return (
    <button className={styling}>
      <div className="flex gap-2">
        <input
          type="checkbox"
          id="some_id"
          className="relative peer shrink-0 appearance-none w-5 h-5 bg-gray-100 rounded-sm mt-1 checked:bg-red-700 checked:border-0"
        />
        <label htmlFor="some_id" className={"text-sm mt-1"}>
          {title}
        </label>
        <svg
          className=" absolute w-4 h-4 mt-1.5 ml-0.5 hidden peer-checked:block bg-red-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </button>
  );
};
