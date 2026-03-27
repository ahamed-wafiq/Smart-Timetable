import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '../store/uiSlice';
import { FiMenu, FiBook, FiLogOut } from 'react-icons/fi';
import '../styles/navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = () => {
    // Simulate logout
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className="navbar-menu-btn show-mobile"
            onClick={handleMenuToggle}
            title="Toggle menu"
          >
            <FiMenu size={24} />
          </button>
          <div className="navbar-logo">
            <FiBook size={28} />
            <span>Smart Timetable</span>
          </div>
        </div>

        <div className="navbar-right">
          <button 
            className="navbar-icon-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
