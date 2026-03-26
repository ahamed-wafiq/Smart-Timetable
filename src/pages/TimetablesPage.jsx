import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTimetables } from '../store/timetableSlice';
import { mockTimetablesData } from '../utils/mockData';
import DepartmentSelector from '../components/DepartmentSelector';
import TimetableCard from '../components/TimetableCard';
import '../styles/timetables-page.css';

const TimetablesPage = () => {
  const dispatch = useDispatch();
  const { selectedDepartment, selectedSemester, timetables } = useSelector(
    (state) => state.timetables
  );

  useEffect(() => {
    if (timetables.length === 0) {
      dispatch(setTimetables(mockTimetablesData));
    }
  }, [dispatch, timetables.length]);

  // Filter timetables based on department and semester
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
          <p>No timetables available for the selected criteria.</p>
        </div>
      ) : (
        <div className="timetables-list">
          <h3 className="section-title">
            Available Options ({filteredTimetables.length})
          </h3>
          {filteredTimetables.map((timetable) => (
            <TimetableCard
              key={timetable.id}
              timetable={timetable}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimetablesPage;
