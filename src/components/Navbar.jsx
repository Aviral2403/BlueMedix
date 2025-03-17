import React from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "../assets/styles/Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <FiMenu />
        </button>
        <div className="logo">
          <Link to="/">
            <h1>BlueMedix</h1>
          </Link>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
