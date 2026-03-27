import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calculateWeeklyStressMetrics, getStressLevel } from '../utils/stressAnalysis';
import DepartmentSelector from '../components/DepartmentSelector';
import StressChart from '../components/StressChart';
import { FiTrendingUp } from 'react-icons/fi';
import '../styles/analysis-page.css';

const AnalysisPage = () => {
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );
  const [selectedOption, setSelectedOption] = useState(1);

  const relevantTimetables = timetables.filter(
    (t) => t.department === selectedDepartment && t.semester === selectedSemester
  );

  // Reset selected option whenever the filtered set changes
  useEffect(() => {
    if (relevantTimetables.length > 0) {
      setSelectedOption(relevantTimetables[0].optionNumber);
    }
  }, [selectedDepartment, selectedSemester]);

  const hasTimetables = relevantTimetables.length > 0;

  const selectedTimetable = hasTimetables
    ? (relevantTimetables.find((t) => t.optionNumber === selectedOption) ??
        relevantTimetables[0])
    : null;

  const metrics = selectedTimetable
    ? calculateWeeklyStressMetrics(selectedTimetable.entries)
    : null;

  const dayChartData = metrics
    ? Object.entries(metrics.dayStressScores).map(([day, score]) => ({
        name: day,
        value: Math.round(score),
      }))
    : [];

  return (
    <div className="analysis-page page-content">
      <div className="page-header">
        <h1>Stress Analysis</h1>
        <p>Detailed timetable stress metrics and optimization insights</p>
      </div>

      <DepartmentSelector />

      {!hasTimetables ? (
        <div className="empty-state card">
          <div className="empty-icon">📉</div>
          <h3>No Data to Analyze</h3>
          <p>
            Generate a timetable from the <strong>Generator</strong> page first,
            then come back here to see stress analysis.
          </p>
        </div>
      ) : (
        <>
          {/* Option selector */}
          <div className="option-selector card">
            <h3>Select Timetable Option</h3>
            <div className="button-group">
              {relevantTimetables.map((opt) => (
                <button
                  key={opt.optionNumber}
                  className={`option-btn ${selectedOption === opt.optionNumber ? 'active' : ''}`}
                  onClick={() => setSelectedOption(opt.optionNumber)}
                >
                  Option {opt.optionNumber}
                  <span className="score-badge">
                    {opt.optimizationScore.toFixed(1)}%
                  </span>
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
                  <span
                    className={`metric-level ${getStressLevel(
                      metrics.averageStress
                    ).label.toLowerCase()}`}
                  >
                    {getStressLevel(metrics.averageStress).label}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Optimization Score</span>
                  <span className="metric-value">
                    {selectedTimetable.optimizationScore.toFixed(1)}%
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Total Lectures</span>
                  <span className="metric-value">
                    {selectedTimetable.entries.length}
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
                      <div
                        className={`stress-badge ${stressLevel.label.toLowerCase()}`}
                      >
                        {Math.round(stress)}
                      </div>
                    </div>
                    <div className="day-metrics">
                      <div className="metric-row">
                        <span className="metric-name">📚 Total Lectures</span>
                        <span className="metric-num">
                          {dayMetrics.totalLectures}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-name">⚠️ Hard Subjects</span>
                        <span className="metric-num">
                          {dayMetrics.hardSubjects}
                        </span>
                      </div>
                      <div className="metric-row">
                        <span className="metric-name">⏱️ Gaps Between</span>
                        <span className="metric-num">
                          {dayMetrics.gapsBetweenLectures}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisPage;
