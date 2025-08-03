import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menu = [
    { title: "Home", path: "/" },
    { title: "Products", path: "/products" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];


  const count = useSelector((state) => state.count.value);

  return (
    <div>
      <header>
        <nav className="bg-transparent backdrop-blur-3xl dark:bg-transparent fixed w-full z-20 top-0 start-0 border-b border-zinc-200 dark:border-zinc-600">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <NavLink to="/" className="flex items-center space-x-3">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Ace Shop
                </span>
              </NavLink>
              {/* Rest of the JSX remains the same */}
              <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
                <ul className="flex space-x-8 font-medium">
                  {menu.map((nav, index) => (
                    <li key={index}>
                      <NavLink
                        to={nav.path}
                        className={({ isActive }) =>
                          isActive
                            ? "text-white px-3 py-2 rounded-sm md:bg-transparent md:text-primary-700 md:p-0 md:dark:text-primary-500"
                            : "text-zinc-900 hover:text-primary-700 md:p-0 md:dark:hover:text-primary-500 dark:text-white dark:hover:text-primary-500"
                        }
                        aria-current="page"
                      >
                        {nav.title}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <NavLink
                  to="/cart"
                  className="relative text-zinc-900 dark:text-white hover:text-primary-700 dark:hover:text-primary-500"
                >
                  <FaShoppingCart className="w-5 h-5" />
                  {count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-zinc-900 font-semibold dark:text-white hover:text-primary-700 dark:hover:text-primary-500"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="px-4 py-2 text-white font-semibold bg-primary-700 rounded-lg hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700"
                >
                  Sign up
                </NavLink>
              </div>

              <button
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`items-center justify-center w-full md:hidden transition-all duration-300 ${
                isOpen ? "block" : "hidden"
              }`}
              id="navbar-sticky"
            >
              <ul className="flex flex-col p-4 mt-4 font-medium border rounded-lg space-y-2 bg-white dark:bg-zinc-800">
                <li>
                  <NavLink
                    to="/"
                    className="block py-2 px-3 text-white bg-primary-700 rounded-sm"
                    aria-current="page"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/products"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/cart"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Cart ({count})
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/signup"
                    className="block py-2 px-3 text-zinc-900 rounded-sm hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign up
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}