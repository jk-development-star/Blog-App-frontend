import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaUsers,
  FaBlog,
  FaTimes,
  FaTachometerAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";
import "./sidebar.css";

const Sidebar = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUsers />,
    },
    {
      path: "/blog-list",
      name: "Blogs",
      icon: <FaBlog />,
    },
  ];

  return (
    <div className="layout">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* App Brand Section */}
        <div className="sidebar-brand">
          <div className="brand-content">
            <FaBlog className="brand-icon" />
            <span className="brand-text">Blog App</span>
          </div>
          <button className="toggle-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-image">
            <FaUser />
          </div>
          <div className="profile-info">
            <span className="profile-name">Admin User</span>
            <span className="profile-role">Administrator</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="menu">
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index} className="menu-item">
              <div className="menu-icon">{item.icon}</div>
              <span className="menu-text">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* Settings Section at Bottom */}
        <div className="sidebar-footer">
          <Link to="/settings" className="menu-item">
            <div className="menu-icon">
              <FaCog />
            </div>
            <span className="menu-text">Settings</span>
          </Link>
        </div>
      </div>

      {/* Floating Toggle Button - Visible when sidebar is collapsed */}
      {!isSidebarOpen && (
        <button className="floating-toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
