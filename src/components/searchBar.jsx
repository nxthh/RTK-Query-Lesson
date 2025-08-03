import React, { useState, useEffect, useRef } from "react";

export default function SearchBar({ onCategorySelect, categories: propCategories }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [categories, setCategories] = useState([]); // Now this will be populated from props
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // When propCategories change, update the local state.
    // Add "All categories" as the first option if it's not already there.
    if (propCategories && propCategories.length > 0) {
      const allCategoriesOption = { name: "All categories", key: "all-categories-unique" };
      const processedCategories = propCategories.map((cat) => ({
        name: cat, // Assuming propCategories are just names from Products.jsx now
        key: cat,
      }));
      setCategories([allCategoriesOption, ...processedCategories]);
    } else {
      setCategories([{ name: "All categories", key: "all-categories-unique" }]);
    }
  }, [propCategories]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setIsDropdownOpen(false);
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  };

  // Remove loading and error states for categories, as they are managed by Products.jsx
  // and passed down as props. The SearchBar will simply render based on `categories` prop.

  return (
    <form className="max-w-lg mx-auto px-4 mt-25">
      <div className="flex relative">
        <label
          htmlFor="search-dropdown"
          className="mb-2 text-sm font-medium text-zinc-900 sr-only dark:text-white"
        >
          Search
        </label>
        <button
          id="dropdown-button"
          ref={buttonRef}
          onClick={toggleDropdown}
          className="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-zinc-900 bg-zinc-100 border border-zinc-300 rounded-s-lg hover:bg-zinc-200 focus:ring-4 focus:outline-none focus:ring-zinc-100 dark:bg-zinc-700 dark:hover:bg-zinc-600 dark:focus:ring-zinc-700 dark:text-white dark:border-zinc-600"
          type="button"
        >
          {selectedCategory}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          ref={dropdownRef}
          className={`absolute z-20 ${
            isDropdownOpen ? "block" : "hidden"
          } bg-white divide-y divide-zinc-100 rounded-lg shadow-sm w-44 dark:bg-zinc-700`}
          style={{ top: "calc(100% + 5px)", left: "0" }}
        >
          <ul
            className="py-2 text-sm text-zinc-700 dark:text-zinc-200"
            aria-labelledby="dropdown-button"
          >
            {categories.map((category) => (
              <li key={category.key}>
                <button
                  type="button"
                  onClick={() => handleCategoryClick(category.name)}
                  className="inline-flex w-full px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-600 dark:hover:text-white"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block p-2.5 w-full z-20 text-sm text-zinc-900 bg-zinc-50 rounded-e-lg border-s-zinc-50 border-s-2 border border-zinc-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-zinc-700 dark:border-s-zinc-700 dark:border-zinc-600 dark:placeholder-zinc-400 dark:text-white dark:focus:border-primary-500"
            placeholder="Search Desktop, Laptop, Console ..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary-700 rounded-e-lg border border-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}