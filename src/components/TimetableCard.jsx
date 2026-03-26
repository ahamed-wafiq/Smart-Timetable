import React, { useState } from 'react';
import { 
  FiDownload, 
  FiChevronDown, 
  FiChevronUp,
  FiCheck,
  FiX
} from 'react-icons/fi';
import { FaFilePdf } from 'react-icons/fa';
import { TIME_SLOT_NUMBERS, DAYS_OF_WEEK } from '../utils/constants';
import '../styles/timetableCard.css';

const TimetableCard = ({ timetable, filters = {} }) => {
  const [expanded, setExpanded] = useState(false);
  
  if (!timetable || !timetable.entries || timetable.entries.length === 0) {
    return (
      <div className="timetable-card card">
        <p className="no-data">No timetable entries available</p>
      </div>
    );
  }

  // Filter entries based on search criteria
  const filteredEntries = timetable.entries.filter((entry) => {
    let matches = true;
    
    if (filters.faculty && !entry.faculty.toLowerCase().includes(filters.faculty.toLowerCase())) {
      matches = false;
    }
    if (filters.subject && !entry.subject.toLowerCase().includes(filters.subject.toLowerCase())) {
      matches = false;
    }
    if (filters.classroom && !entry.classroom.toLowerCase().includes(filters.classroom.toLowerCase())) {
      matches = false;
    }
    
    return matches;
  });

  // Group entries by day
  const entriesByDay = {};
  DAYS_OF_WEEK.forEach((day) => {
    entriesByDay[day] = filteredEntries
      .filter((e) => e.day === day)
      .sort((a, b) => parseInt(a.timeSlot) - parseInt(b.timeSlot));
  });

  const handleExportPDF = () => {
    // Simulate PDF export
    const content = `
Timetable Export
Department: ${timetable.department}
Semester: ${timetable.semester}
Option: ${timetable.optionNumber}
Optimization Score: ${timetable.optimizationScore?.toFixed(2)}%

${Object.entries(entriesByDay).map(([day, entries]) =>
  `${day}:\n${entries.map((e) => `  ${e.startTime}-${e.endTime}: ${e.subject} (${e.faculty}, ${e.classroom})`).join('\n')}`
).join('\n\n')}
    `;
    
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `timetable-${timetable.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="timetable-card card">
      <div className="timetable-header">
        <div className="timetable-title">
          <h3>Option {timetable.optionNumber}</h3>
          <div className="optimization-score">
            <span className="score-label">Optimization Score</span>
            <span className="score-value">
              {timetable.optimizationScore?.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="timetable-actions">
          <button 
            className="btn-export"
            onClick={handleExportPDF}
            title="Download timetable"
          >
            <FiDownload size={18} />
          </button>
          <button 
            className="btn-expand"
            onClick={() => setExpanded(!expanded)}
            title={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="timetable-content">
          <div className="timetable-grid">
            <div className="grid-header">
              <div className="grid-time">Time</div>
              {DAYS_OF_WEEK.map((day) => (
                <div key={day} className="grid-day">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid-body">
              {Object.values(TIME_SLOT_NUMBERS).map((time, idx) => (
                <div key={idx} className="grid-row">
                  <div className="grid-time-slot">{time}</div>
                  {DAYS_OF_WEEK.map((day) => {
                    const entry = entriesByDay[day]?.find(
                      (e) => parseInt(e.timeSlot) === idx
                    );
                    return (
                      <div key={`${day}-${idx}`} className="grid-cell">
                        {entry ? (
                          <div className="cell-entry">
                            <div className="subject-name">{entry.subject}</div>
                            <div className="faculty-name">{entry.faculty}</div>
                            <div className="classroom-name">{entry.classroom}</div>
                          </div>
                        ) : (
                          <div className="cell-empty">—</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="timetable-summary">
            <h4>Summary</h4>
            <div className="summary-stats">
              {DAYS_OF_WEEK.map((day) => {
                const dayEntries = entriesByDay[day];
                return (
                  <div key={day} className="summary-stat">
                    <span className="stat-label">{day}</span>
                    <span className="stat-value">{dayEntries.length} lectures</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableCard;
