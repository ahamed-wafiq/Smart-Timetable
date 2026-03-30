import React from 'react';
import { useSelector } from 'react-redux';
import DepartmentSelector from '../components/DepartmentSelector';
import TimetableCard from '../components/TimetableCard';
import '../styles/timetables-page.css';

const TimetablesPage = () => {
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );

  const filteredTimetables = timetables.filter(
    (t) => t.department === selectedDepartment && t.semester === selectedSemester
  );

  return (
    <div className="timetables-page page-content">
      <div className="page-header">
        <h1>Timetables</h1>
        <p>Review and compare different timetable options</p>
      </div>

      <DepartmentSelector />

      {filteredTimetables.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-icon">🗓️</div>
          <h3>No Timetables Available</h3>
          <p>
            No timetables exist for the selected department and semester.
            Head to the <strong>Generator</strong> page to create one.
          </p>
        </div>
      ) : (
        <div className="timetables-list">
          <h3 className="section-title">
            Available Options ({filteredTimetables.length})
          </h3>
          {filteredTimetables.map((timetable, index) => (
            <TimetableCard key={timetable.id} timetable={timetable} displayNumber={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimetablesPage;
