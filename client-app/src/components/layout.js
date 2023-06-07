// components/layout.js

import React from "react";
import NavBar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      {/* Additional layout components or elements */}
    </div>
  );
};

export default Layout;
