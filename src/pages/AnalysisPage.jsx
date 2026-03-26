import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimetables } from '../store/timetableSlice';
import { mockTimetablesData } from '../utils/mockData';
import { calculateWeeklyStressMetrics, getStressLevel } from '../utils/stressAnalysis';
import DepartmentSelector from '../components/DepartmentSelector';
import StressChart, { StressDistributionPie } from '../components/StressChart';
import { FiTrendingUp } from 'react-icons/fi';
import '../styles/analysis-page.css';

const AnalysisPage = () => {
  const dispatch = useDispatch();
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );
  const [stressData, setStressData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    if (timetables.length === 0) {
      dispatch(setTimetables(mockTimetablesData));
    }
  }, [dispatch, timetables.length]);

  useEffect(() => {
    if (timetables.length === 0) return;

    const relevantTimetables = timetables.filter(
      (t) => t.department === selectedDepartment && t.semester === selectedSemester
    );

    if (relevantTimetables.length === 0) return;

    const selectedTimetable = relevantTimetables.find(
      (t) => t.optionNumber === selectedOption
    ) || relevantTimetables[0];

    const metrics = calculateWeeklyStressMetrics(selectedTimetable.entries);
    setStressData({
      timetable: selectedTimetable,
      metrics: metrics,
      options: relevantTimetables,
    });
  }, [selectedDepartment, selectedSemester, selectedOption, timetables]);

  if (!stressData) {
    return (
      <div className="analysis-page page-content">
        <div className="loading">Loading analysis...</div>
      </div>
    );
  }

  const { metrics, options, timetable } = stressData;
  const dayChartData = Object.entries(metrics.dayStressScores).map(([day, score]) => ({
    name: day,
    value: Math.round(score),
  }));

  const statsData = Object.entries(metrics.dayMetrics).map(([day, data]) => ({
    name: day,
    lectures: data.totalLectures,
    hardSubjects: data.hardSubjects,
    gaps: data.gapsBetweenLectures,
  }));

  return (
    <div className="analysis-page page-content">
      <div className="page-header">
        <h1>Stress Analysis</h1>
        <p>Detailed timetable stress metrics and optimization insights</p>
      </div>

      <DepartmentSelector />

      <div className="option-selector card">
        <h3>Select Timetable Option</h3>
        <div className="button-group">
          {options.map((opt) => (
            <button
              key={opt.optionNumber}
              className={`option-btn ${selectedOption === opt.optionNumber ? 'active' : ''}`}
              onClick={() => setSelectedOption(opt.optionNumber)}
            >
              Option {opt.optionNumber}
              <span className="score-badge">{opt.optimizationScore.toFixed(1)}%</span>
            </button>
          ))}
        </div>
      </div>

      <div className="analysis-grid">
        <div className="stress-summary card">
          <h3>
            <FiTrendingUp size={20} />
            Overall Stress Summary
          </h3>
          <div className="summary-metrics">
            <div className="metric">
              <span className="metric-label">Average Weekly Stress</span>
              <span className="metric-value">
                {metrics.averageStress.toFixed(1)}/100
              </span>
              <span className={`metric-level ${getStressLevel(metrics.averageStress).label.toLowerCase()}`}>
                {getStressLevel(metrics.averageStress).label}
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Optimization Score</span>
              <span className="metric-value">
                {timetable.optimizationScore.toFixed(1)}%
              </span>
            </div>
            <div className="metric">
              <span className="metric-label">Total Lectures</span>
              <span className="metric-value">
                {timetable.entries.length}
              </span>
            </div>
          </div>
        </div>

        <div className="stress-chart card">
          <h3>Daily Stress Pattern</h3>
          <StressChart data={dayChartData} type="line" />
        </div>
      </div>

      <div className="detailed-analysis">
        <h3>Day-by-Day Breakdown</h3>
        <div className="day-cards-grid">
          {Object.entries(metrics.dayMetrics).map(([day, dayMetrics]) => {
            const stress = metrics.dayStressScores[day];
            const stressLevel = getStressLevel(stress);
            return (
              <div key={day} className="day-card card">
                <div className="day-header">
                  <h4>{day}</h4>
                  <div className={`stress-badge ${stressLevel.label.toLowerCase()}`}>
                    {Math.round(stress)}
                  </div>
                </div>

                <div className="day-metrics">
                  <div className="metric-row">
                    <span className="metric-name">📚 Total Lectures</span>
                    <span className="metric-num">{dayMetrics.totalLectures}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-name">⚠️ Hard Subjects</span>
                    <span className="metric-num">{dayMetrics.hardSubjects}</span>
                  </div>
                  <div className="metric-row">
                    <span className="metric-name">⏱️ Gaps Between</span>
                    <span className="metric-num">{dayMetrics.gapsBetweenLectures}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


    </div>
  );
};

export default AnalysisPage;
