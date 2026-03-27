import React from 'react';
import { useSelector } from 'react-redux';
import {
  calculateWeeklyStressMetrics,
} from '../utils/stressAnalysis';
import DepartmentSelector from '../components/DepartmentSelector';
import '../styles/dashboard.css';

const Dashboard = () => {
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );

  // Get timetables matching current department + semester selection
  const relevantTimetables = timetables.filter(
    (t) => t.department === selectedDepartment && t.semester === selectedSemester
  );

  const hasTimetables = relevantTimetables.length > 0;

  // Compute stats only when data exists
  const currentTimetable = relevantTimetables[0] ?? null;
  const stressMetrics = currentTimetable
    ? calculateWeeklyStressMetrics(currentTimetable.entries)
    : null;
  const averageOptimizationScore = hasTimetables
    ? relevantTimetables.reduce((sum, t) => sum + t.optimizationScore, 0) /
      relevantTimetables.length
    : null;

  return (
    <div className="dashboard page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Smart Timetable Analysis &amp; Optimization</p>
      </div>

      <DepartmentSelector />

      {!hasTimetables ? (
        <div className="empty-state card">
          <div className="empty-icon">📅</div>
          <h3>No Timetables Yet</h3>
          <p>
            Generate a timetable from the <strong>Generator</strong> page to
            see stats and analysis here.
          </p>
        </div>
      ) : (
        <>
          <div className="stats-grid">
            <div className="stat-card card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <h4>Total Options</h4>
                <p className="stat-value">{relevantTimetables.length}</p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h4>Avg. Optimization</h4>
                <p className="stat-value">
                  {averageOptimizationScore.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">📚</div>
              <div className="stat-info">
                <h4>Total Lectures</h4>
                <p className="stat-value">{currentTimetable.entries.length}</p>
              </div>
            </div>

            <div className="stat-card card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <h4>Avg. Daily Stress</h4>
                <p className="stat-value">
                  {stressMetrics?.averageStress?.toFixed(1) ?? '—'}
                </p>
              </div>
            </div>
          </div>

          <div className="options-section">
            <h3>Timetable Options Comparison</h3>
            <div className="options-list card">
              {relevantTimetables.map((t) => (
                <div key={t.id} className="option-item">
                  <span className="option-label">Option {t.optionNumber}</span>
                  <div className="score-bar">
                    <div
                      className="score-fill"
                      style={{ width: `${t.optimizationScore.toFixed(1)}%` }}
                    />
                  </div>
                  <span className="option-score">
                    {t.optimizationScore.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
