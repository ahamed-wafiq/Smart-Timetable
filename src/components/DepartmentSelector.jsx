import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setSelectedDepartment, 
  setSelectedSemester 
} from '../store/timetableSlice';
import { DEPARTMENTS, SEMESTERS } from '../utils/constants';
import '../styles/departmentSelector.css';

const DepartmentSelector = () => {
  const dispatch = useDispatch();
  const { selectedDepartment, selectedSemester } = useSelector(
    (state) => state.timetables
  );

  const handleDepartmentChange = (e) => {
    dispatch(setSelectedDepartment(e.target.value));
  };

  const handleSemesterChange = (e) => {
    dispatch(setSelectedSemester(parseInt(e.target.value)));
  };

  return (
    <div className="department-selector-container card">
      <div className="department-selector">
        <div className="selector-group">
          <label htmlFor="department-select">Department</label>
          <select 
            id="department-select"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="selector-input"
          >
            {Object.entries(DEPARTMENTS).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="selector-group">
          <label htmlFor="semester-select">Semester</label>
          <select 
            id="semester-select"
            value={selectedSemester}
            onChange={handleSemesterChange}
            className="selector-input"
          >
            {SEMESTERS.map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="department-info">
        <p className="info-text">
          Showing timetable for <strong>{DEPARTMENTS[selectedDepartment]}</strong> - <strong>Semester {selectedSemester}</strong>
        </p>
      </div>
    </div>
  );
};

export default DepartmentSelector;
