import React from "react";

const Navbar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-gray-200">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">Menu</h1>
      </div>
      <nav className="px-4 py-2">
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              Employer
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              Categories
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              Types
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-gray-200 hover:bg-gray-800"
            >
              Skills
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Navbar;
