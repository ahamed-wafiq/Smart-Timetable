import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiInfo, FiCheck } from 'react-icons/fi';
import '../styles/settings-page.css';

const SettingsPage = () => {
  const [notificationMessage, setNotificationMessage] = useState('');
  const dispatch = useDispatch();

  const handleExportData = () => {
    const data = localStorage.getItem('persist:root');
    if (data) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
      element.setAttribute('download', 'timetable-backup.json');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setNotificationMessage('Data exported successfully!');
      setTimeout(() => setNotificationMessage(''), 3000);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.removeItem('persist:root');
      setNotificationMessage('Data cleared successfully!');
      setTimeout(() => setNotificationMessage(''), 3000);
      window.location.reload();
    }
  };

  return (
    <div className="settings-page page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Customize your Smart Timetable experience</p>
      </div>

      {notificationMessage && (
        <div className="notification card success">
          <FiCheck size={20} />
          <span>{notificationMessage}</span>
        </div>
      )}

      <div className="settings-grid">
        <div className="settings-section card">
          <h3>Data Management</h3>
          
          <div className="setting-item button-setting">
            <div className="setting-info">
              <h4>Export Data</h4>
              <p>Download your timetable data as a JSON backup</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleExportData}
            >
              Export
            </button>
          </div>

          <div className="setting-item button-setting">
            <div className="setting-info">
              <h4>Clear Data</h4>
              <p>Remove all stored timetable data (cannot be undone)</p>
            </div>
            <button 
              className="btn btn-danger"
              onClick={handleClearData}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="settings-section card info-section">
          <h3>
            <FiInfo size={20} />
            About Smart Timetable
          </h3>
          <div className="about-content">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Built with:</strong> React.js, Redux Toolkit, React Router</p>
            <p><strong>Purpose:</strong> Smart timetable management and stress analysis for educational institutions</p>
            
            <div className="features-list">
              <h4>Features</h4>
              <ul>
                <li>✓ Stress Detection Dashboard</li>
                <li>✓ Priority-Based Scheduling System</li>
                <li>✓ Multi-Department Support</li>
                <li>✓ Advanced Search & Filtering</li>
                <li>✓ Responsive Design (Mobile, Tablet, Desktop)</li>
                <li>✓ Dark Mode Support</li>
                <li>✓ Real-time Analytics</li>
                <li>✓ Timetable Optimization Scores</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;
