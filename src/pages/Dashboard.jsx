import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimetables, setSelectedDepartment, setSelectedSemester } from '../store/timetableSlice';
import { mockTimetablesData, initializeMockData } from '../utils/mockData';
import { 
  calculateWeeklyStressMetrics, 
  getStressLevel, 
  calculateOptimizationScore 
} from '../utils/stressAnalysis';
import DepartmentSelector from '../components/DepartmentSelector';
import StressChart, { StressDistributionPie } from '../components/StressChart';
import '../styles/dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );
  const [stressMetrics, setStressMetrics] = useState(null);
  const [dashboardStats, setDashboardStats] = useState(null);

  useEffect(() => {
    // Initialize data
    initializeMockData();
    dispatch(setTimetables(mockTimetablesData));
  }, [dispatch]);

  useEffect(() => {
    if (timetables.length === 0) return;

    // Get relevant timetables
    const relevantTimetables = timetables.filter(
      (t) => t.department === selectedDepartment && t.semester === selectedSemester
    );

    if (relevantTimetables.length === 0) return;

    // Use the first timetable for stress analysis
    const currentTimetable = relevantTimetables[0];
    const metrics = calculateWeeklyStressMetrics(currentTimetable.entries);
    setStressMetrics(metrics);

    // Calculate stats
    const stats = {
      totalTimetables: relevantTimetables.length,
      optionScores: relevantTimetables.map((t) => ({
        option: t.optionNumber,
        score: t.optimizationScore.toFixed(1),
      })),
      averageOptimizationScore:
        relevantTimetables.reduce((sum, t) => sum + t.optimizationScore, 0) /
        relevantTimetables.length,
      totalEntries: currentTimetable.entries.length,
    };

    setDashboardStats(stats);
  }, [selectedDepartment, selectedSemester, timetables]);

  if (!dashboardStats) {
    return (
      <div className="dashboard page-content">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  // Prepare chart data
  const stressChartData = stressMetrics
    ? Object.entries(stressMetrics.dayStressScores).map(([day, score]) => ({
        name: day,
        value: Math.round(score),
      }))
    : [];

  const stressDistributionData = stressMetrics
    ? Object.entries(stressMetrics.dayMetrics).map(([day, metrics]) => ({
        name: day,
        value: metrics.totalLectures,
      }))
    : [];

  return (
    <div className="dashboard page-content">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Smart Timetable Analysis & Optimization</p>
      </div>

      <DepartmentSelector />

      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h4>Total Options</h4>
            <p className="stat-value">{dashboardStats.totalTimetables}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h4>Avg. Optimization</h4>
            <p className="stat-value">
              {dashboardStats.averageOptimizationScore.toFixed(1)}%
            </p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h4>Total Lectures</h4>
            <p className="stat-value">{dashboardStats.totalEntries}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h4>Avg. Daily Stress</h4>
            <p className="stat-value">
              {stressMetrics?.averageStress?.toFixed(1) || 0}
            </p>
          </div>
        </div>
      </div>



      <div className="options-section">
        <h3>Timetable Options Comparison</h3>
        <div className="options-list card">
          {dashboardStats.optionScores.map((option) => (
            <div key={option.option} className="option-item">
              <span className="option-label">Option {option.option}</span>
              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{ width: `${option.score}%` }}
                />
              </div>
              <span className="option-score">{option.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
