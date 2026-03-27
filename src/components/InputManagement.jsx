import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSubject,
  removeSubject,
  addFaculty,
  removeFaculty,
  addClassroom,
  removeClassroom,
  setSelectedDepartment,
} from '../store/inputSlice';
import { DEPARTMENTS } from '../utils/constants';
import '../styles/input-management.css';

const InputManagement = () => {
  const dispatch = useDispatch();
  const { subjects, faculty, classrooms, selectedDepartment } = useSelector(
    (state) => state.inputs
  );

  // Subject form
  const [subjectName, setSubjectName] = useState('');
  const [lecturesPerWeek, setLecturesPerWeek] = useState('3');

  // Faculty form
  const [facultyName, setFacultyName] = useState('');
  const [assignedSubject, setAssignedSubject] = useState('');

  // Classroom form
  const [classroomName, setClassroomName] = useState('');
  const [capacity, setCapacity] = useState('');

  const handleAddSubject = () => {
    if (subjectName.trim()) {
      dispatch(
        addSubject({
          id: Date.now(),
          name: subjectName,
          lecturesPerWeek: Number(lecturesPerWeek),
        })
      );
      setSubjectName('');
      setLecturesPerWeek('3');
    }
  };

  const handleAddFaculty = () => {
    if (facultyName.trim() && assignedSubject) {
      dispatch(
        addFaculty({
          id: Date.now(),
          name: facultyName,
          assignedSubject: Number(assignedSubject),
        })
      );
      setFacultyName('');
      setAssignedSubject('');
    }
  };

  const handleAddClassroom = () => {
    if (classroomName.trim()) {
      dispatch(
        addClassroom({
          id: Date.now(),
          name: classroomName,
          capacity: capacity || 'N/A',
        })
      );
      setClassroomName('');
      setCapacity('');
    }
  };

  return (
    <div className="input-management">
      <h2>📋 Manage Inputs</h2>

      {/* Department Selector */}
      <div className="section card">
        <h3>Department</h3>
        <select
          value={selectedDepartment}
          onChange={(e) => dispatch(setSelectedDepartment(e.target.value))}
          className="input-field"
        >
          {Object.entries(DEPARTMENTS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <p className="selected-dept">Selected: {DEPARTMENTS[selectedDepartment]}</p>
      </div>

      {/* Subjects Section */}
      <div className="section card">
        <h3>Subjects</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            min="1"
            max="5"
            placeholder="Lectures/week"
            value={lecturesPerWeek}
            onChange={(e) => setLecturesPerWeek(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAddSubject} className="btn btn-primary">
            Add Subject
          </button>
        </div>

        {subjects.length > 0 && (
          <div className="items-list">
            {subjects.map((subject) => (
              <div key={subject.id} className="item">
                <span>{subject.name}</span>
                <span className="badge">{subject.lecturesPerWeek} lectures/week</span>
                <button
                  onClick={() => dispatch(removeSubject(subject.id))}
                  className="btn btn-small btn-danger"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Faculty Section */}
      <div className="section card">
        <h3>Faculty</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Faculty name"
            value={facultyName}
            onChange={(e) => setFacultyName(e.target.value)}
            className="input-field"
          />
          <select
            value={assignedSubject}
            onChange={(e) => setAssignedSubject(e.target.value)}
            className="input-field"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddFaculty} className="btn btn-primary">
            Add Faculty
          </button>
        </div>

        {faculty.length > 0 && (
          <div className="items-list">
            {faculty.map((f) => {
              const subj = subjects.find((s) => s.id === f.assignedSubject);
              return (
                <div key={f.id} className="item">
                  <span>{f.name}</span>
                  <span className="badge">{subj?.name || 'N/A'}</span>
                  <button
                    onClick={() => dispatch(removeFaculty(f.id))}
                    className="btn btn-small btn-danger"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Classrooms Section */}
      <div className="section card">
        <h3>Classrooms</h3>
        <div className="input-group">
          <input
            type="text"
            placeholder="Room name (e.g., A-101)"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Capacity (optional)"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="input-field"
          />
          <button onClick={handleAddClassroom} className="btn btn-primary">
            Add Classroom
          </button>
        </div>

        {classrooms.length > 0 && (
          <div className="items-list">
            {classrooms.map((room) => (
              <div key={room.id} className="item">
                <span>{room.name}</span>
                <span className="badge">Cap: {room.capacity}</span>
                <button
                  onClick={() => dispatch(removeClassroom(room.id))}
                  className="btn btn-small btn-danger"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputManagement;
