import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentPage, setSidebarOpen } from '../store/uiSlice';
import { 
  FiHome, 
  FiGrid, 
  FiBarChart2,
  FiTool,
  FiSettings,
  FiX
} from 'react-icons/fi';
import '../styles/sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sidebarOpen, currentPage } = useSelector((state) => state.ui);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome, path: '/' },
    { id: 'timetables', label: 'Timetables', icon: FiGrid, path: '/timetables' },
    { id: 'analysis', label: 'Stress Analysis', icon: FiBarChart2, path: '/analysis' },
    { id: 'generator', label: 'Generator', icon: FiTool, path: '/generator' },
    { id: 'settings', label: 'Settings', icon: FiSettings, path: '/settings' },
  ];

  const handleMenuClick = (item) => {
    dispatch(setCurrentPage(item.id));
    navigate(item.path);
    // Close sidebar on mobile
    if (window.innerWidth <= 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleCloseSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <>
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button 
            className="sidebar-close-btn show-mobile"
            onClick={handleCloseSidebar}
            title="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
                title={item.label}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {sidebarOpen && (
        <div 
          className="sidebar-overlay show-mobile"
          onClick={handleCloseSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
