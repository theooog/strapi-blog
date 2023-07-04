"use client";
import React, { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const Dropdown = ({ categories }) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [visibility, setVisibility] = useState(false);
  const checkBoxHandler = (event) => {
    const checked = event.target.checked;
    const value = event.target.value;
    const current = new URLSearchParams(`?${searchParams.toString()}`);
    if (checked) {
      // CHANGE params
      current.set("category", value);
    } else {
      current.delete("category");
    }
    window.location.replace(path + "?" + current.toString());
  };
  return (
    <div>
      <button onClick={() => setVisibility(!!!visibility)}>Filter</button>
      {visibility && (
        <div
          id="dropdown"
          className="z-10  w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <h6 class="mb-3 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </h6>
          <ul className="space-y-2 text-sm" aria-labelledby="dropdownDefault">
            {categories.map((cat) => {
              const attr = cat?.attributes;
              return (
                <li
                  className="flex items-center"
                  key={cat?.id + "categorylist"}
                >
                  <input
                    id={attr?.value}
                    onClick={checkBoxHandler}
                    type="checkbox"
                    checked={searchParams.get("category") == attr?.value}
                    value={attr?.value}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label
                    htmlFor={attr?.value}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                  >
                    {attr?.label}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
