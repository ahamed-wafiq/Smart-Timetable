import React, { useState } from 'react';
import { DAYS_OF_WEEK, TIME_SLOTS } from '../utils/constants';
import { getSlotStatus, filterTimetable } from '../utils/timetableGenerator';
import '../styles/generated-timetable.css';

const GeneratedTimetableDisplay = ({ timetable, constraints }) => {
  const [filterFaculty, setFilterFaculty] = useState('');
  const [filterSubject, setFilterSubject] = useState('');
  const [filterRoom, setFilterRoom] = useState('');

  // Get unique values for filter dropdowns
  const allFaculty = new Set();
  const allSubjects = new Set();
  const allRooms = new Set();

  Object.values(timetable).forEach((daySchedule) => {
    Object.values(daySchedule).forEach((lecture) => {
      if (lecture) {
        allFaculty.add(lecture.faculty);
        allSubjects.add(lecture.subject);
        allRooms.add(lecture.room);
      }
    });
  });

  const getSlotClass = (day, slot) => {
    const status = getSlotStatus(day, slot, constraints);
    return status;
  };

  return (
    <div className="generated-timetable">
      <h2>📅 Generated Timetable</h2>

      {/* Filters */}
      <div className="filters card">
        <h3>Filters</h3>
        <div className="filter-group">
          <select
            value={filterFaculty}
            onChange={(e) => setFilterFaculty(e.target.value)}
            className="filter-input"
          >
            <option value="">All Faculty</option>
            {Array.from(allFaculty).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="filter-input"
          >
            <option value="">All Subjects</option>
            {Array.from(allSubjects).map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
            className="filter-input"
          >
            <option value="">All Rooms</option>
            {Array.from(allRooms).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setFilterFaculty('');
              setFilterSubject('');
              setFilterRoom('');
            }}
            className="btn btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="legend card">
        <div className="legend-item">
          <span className="legend-color fixed"></span>
          <span>Fixed Lecture (Green)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color reserved"></span>
          <span>Reserved Slot (Red)</span>
        </div>
        <div className="legend-item">
          <span className="legend-color normal"></span>
          <span>Regular Slot</span>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="timetable-grid card">
        <div className="grid-header">
          <div className="time-header">Time</div>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="day-header">
              {day}
            </div>
          ))}
        </div>

        {TIME_SLOTS.map((slot) => (
          <div key={slot} className="grid-row">
            <div className="time-cell">{slot}</div>
            {DAYS_OF_WEEK.map((day) => {
              const lecture = timetable[day]?.[slot];
              const slotClass = getSlotClass(day, slot);

              // Check if matches filters
              let matches = true;
              if (filterFaculty && lecture?.faculty !== filterFaculty)
                matches = false;
              if (filterSubject && lecture?.subject !== filterSubject)
                matches = false;
              if (filterRoom && lecture?.room !== filterRoom) matches = false;

              return (
                <div
                  key={`${day}-${slot}`}
                  className={`grid-cell ${slotClass} ${matches ? '' : 'hidden'}`}
                >
                  {lecture && matches ? (
                    <div className="lecture">
                      <div className="subject">{lecture.subject}</div>
                      <div className="faculty">{lecture.faculty}</div>
                      <div className="room">{lecture.room}</div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneratedTimetableDisplay;
