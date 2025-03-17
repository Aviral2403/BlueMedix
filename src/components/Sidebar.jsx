import React from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import '../assets/styles/Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="sidebar-close" onClick={toggleSidebar}>
        <FiX />
      </button>
      <ul>
        <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>
        <li><Link to="/add-user" onClick={toggleSidebar}>Add User</Link></li>
        <li><Link to="/add-product" onClick={toggleSidebar}>Add Product</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;