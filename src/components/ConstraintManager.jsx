import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReservedClassroom,
  removeReservedClassroom,
  addFacultyUnavailability,
  removeFacultyUnavailability,
  addFixedLecture,
  removeFixedLecture,
} from '../store/constraintSlice';
import { DAYS_OF_WEEK, TIME_SLOTS } from '../utils/constants';
import '../styles/constraint-manager.css';

const ConstraintManager = () => {
  const dispatch = useDispatch();
  const { reservedClassrooms, facultyUnavailability, fixedLectures } = useSelector(
    (state) => state.constraints
  );
  const { subjects, faculty, classrooms } = useSelector((state) => state.inputs);

  // Reserved classroom form
  const [reserveRoom, setReserveRoom] = useState('');
  const [reserveDay, setReserveDay] = useState('Monday');
  const [reserveSlot, setReserveSlot] = useState('08:00 - 09:00');

  // Faculty unavailability form
  const [unavailFaculty, setUnavailFaculty] = useState('');
  const [unavailDay, setUnavailDay] = useState('Monday');
  const [unavailSlot, setUnavailSlot] = useState('08:00 - 09:00');

  // Fixed lecture form
  const [fixedSubject, setFixedSubject] = useState('');
  const [fixedFaculty, setFixedFaculty] = useState('');
  const [fixedRoom, setFixedRoom] = useState('');
  const [fixedDay, setFixedDay] = useState('Monday');
  const [fixedSlot, setFixedSlot] = useState('08:00 - 09:00');

  const handleAddReservation = () => {
    if (reserveRoom && reserveDay && reserveSlot) {
      dispatch(
        addReservedClassroom({
          classroom: reserveRoom,
          day: reserveDay,
          timeSlot: reserveSlot,
        })
      );
      setReserveRoom('');
    }
  };

  const handleAddUnavailability = () => {
    if (unavailFaculty && unavailDay && unavailSlot) {
      dispatch(
        addFacultyUnavailability({
          faculty: unavailFaculty,
          day: unavailDay,
          timeSlot: unavailSlot,
        })
      );
      setUnavailFaculty('');
    }
  };

  const handleAddFixedLecture = () => {
    if (fixedSubject && fixedFaculty && fixedRoom && fixedDay && fixedSlot) {
      dispatch(
        addFixedLecture({
          subject: fixedSubject,
          faculty: fixedFaculty,
          room: fixedRoom,
          day: fixedDay,
          timeSlot: fixedSlot,
        })
      );
      setFixedSubject('');
      setFixedFaculty('');
      setFixedRoom('');
    }
  };

  return (
    <div className="constraint-manager">
      <h2>🔒 Manage Constraints</h2>

      {/* Reserved Classrooms */}
      <div className="section card">
        <h3>Reserved Classrooms</h3>
        <p className="section-desc">Mark classrooms unavailable for specific slots</p>
        <div className="input-group">
          <select
            value={reserveRoom}
            onChange={(e) => setReserveRoom(e.target.value)}
            className="input-field"
          >
            <option value="">Select Classroom</option>
            {classrooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </select>

          <select
            value={reserveDay}
            onChange={(e) => setReserveDay(e.target.value)}
            className="input-field"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            value={reserveSlot}
            onChange={(e) => setReserveSlot(e.target.value)}
            className="input-field"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button onClick={handleAddReservation} className="btn btn-primary">
            Reserve
          </button>
        </div>

        {reservedClassrooms.length > 0 && (
          <div className="constraints-list">
            {reservedClassrooms.map((r) => {
              const room = classrooms.find((c) => c.id === r.classroom);
              return (
                <div key={r.id} className="constraint-item">
                  <span>
                    {room?.name} - {r.day} {r.timeSlot}
                  </span>
                  <button
                    onClick={() => dispatch(removeReservedClassroom(r.id))}
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

      {/* Faculty Unavailability */}
      <div className="section card">
        <h3>Faculty Unavailability</h3>
        <p className="section-desc">Mark faculty unavailable for specific slots</p>
        <div className="input-group">
          <select
            value={unavailFaculty}
            onChange={(e) => setUnavailFaculty(e.target.value)}
            className="input-field"
          >
            <option value="">Select Faculty</option>
            {faculty.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={unavailDay}
            onChange={(e) => setUnavailDay(e.target.value)}
            className="input-field"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            value={unavailSlot}
            onChange={(e) => setUnavailSlot(e.target.value)}
            className="input-field"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button onClick={handleAddUnavailability} className="btn btn-primary">
            Mark Unavailable
          </button>
        </div>

        {facultyUnavailability.length > 0 && (
          <div className="constraints-list">
            {facultyUnavailability.map((f) => {
              const fac = faculty.find((fc) => fc.id === f.faculty);
              return (
                <div key={f.id} className="constraint-item">
                  <span>
                    {fac?.name} - {f.day} {f.timeSlot}
                  </span>
                  <button
                    onClick={() => dispatch(removeFacultyUnavailability(f.id))}
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

      {/* Fixed Lectures */}
      <div className="section card">
        <h3>Fixed Lectures</h3>
        <p className="section-desc">Schedule specific lectures at fixed slots</p>
        <div className="input-group">
          <select
            value={fixedSubject}
            onChange={(e) => setFixedSubject(e.target.value)}
            className="input-field"
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={fixedFaculty}
            onChange={(e) => setFixedFaculty(e.target.value)}
            className="input-field"
          >
            <option value="">Select Faculty</option>
            {faculty.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={fixedRoom}
            onChange={(e) => setFixedRoom(e.target.value)}
            className="input-field"
          >
            <option value="">Select Classroom</option>
            {classrooms.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={fixedDay}
            onChange={(e) => setFixedDay(e.target.value)}
            className="input-field"
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <select
            value={fixedSlot}
            onChange={(e) => setFixedSlot(e.target.value)}
            className="input-field"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>

          <button onClick={handleAddFixedLecture} className="btn btn-primary">
            Fix Lecture
          </button>
        </div>

        {fixedLectures.length > 0 && (
          <div className="constraints-list">
            {fixedLectures.map((f) => {
              const subj = subjects.find((s) => s.id === f.subject);
              const fac = faculty.find((fc) => fc.id === f.faculty);
              const room = classrooms.find((c) => c.id === f.room);
              return (
                <div key={f.id} className="constraint-item fixed">
                  <span>
                    {subj?.name} - {fac?.name} - {room?.name} - {f.day}{' '}
                    {f.timeSlot}
                  </span>
                  <button
                    onClick={() => dispatch(removeFixedLecture(f.id))}
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
    </div>
  );
};

export default ConstraintManager;
