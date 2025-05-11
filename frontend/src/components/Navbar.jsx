import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusSquare } from 'react-icons/ai';
import './navbar.css';  // Import the custom CSS file

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">Towing Service</Link>
        </div>
        <div className="nav-actions">
          <Link to="/create">
            <button className="add-btn">
              <AiOutlinePlusSquare />
              Add Service
            </button>
          </Link>
        </div>
        <div className="nav-actions2">
          <Link to="/history">
            <button className="his-btn">
              View History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
