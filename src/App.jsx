import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import TimetablesPage from './pages/TimetablesPage';
import AnalysisPage from './pages/AnalysisPage';
import GeneratorPage from './pages/GeneratorPage';
import SettingsPage from './pages/SettingsPage';

// Styles
import './styles/globals.css';
import './styles/app.css';

function AppContent() {
  const { sidebarOpen } = useSelector((state) => state.ui);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app dark-mode">
      {!isHomePage && <Navbar />}
      <div className={`main-layout ${isHomePage ? 'full-width' : ''}`}>
        {!isHomePage && <Sidebar />}
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''} ${isHomePage ? 'full-width-content' : ''}`}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/timetables" element={<TimetablesPage />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/generator" element={<GeneratorPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  // Initialize app in dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
