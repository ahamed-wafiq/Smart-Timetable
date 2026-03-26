import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import InputManagement from '../components/InputManagement';
import ConstraintManager from '../components/ConstraintManager';
import GeneratedTimetableDisplay from '../components/GeneratedTimetableDisplay';
import { generateTimetableWithConstraints } from '../utils/timetableGenerator';
import '../styles/generator-page.css';

const GeneratorPage = () => {
  const { subjects, faculty, classrooms } = useSelector((state) => state.inputs);
  const constraints = useSelector((state) => state.constraints);
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [showInputs, setShowInputs] = useState(true);
  const [showConstraints, setShowConstraints] = useState(true);

  const handleGenerateTimetable = () => {
    if (subjects.length === 0 || faculty.length === 0 || classrooms.length === 0) {
      alert('Please add subjects, faculty, and classrooms before generating.');
      return;
    }

    const timetable = generateTimetableWithConstraints(
      subjects,
      faculty,
      classrooms,
      constraints
    );

    setGeneratedTimetable(timetable);
  };

  return (
    <div className="generator-page page-content">
      <div className="page-header">
        <h1>⚙️ Timetable Generator</h1>
        <p>Create custom timetables with constraints and exceptions</p>
      </div>

      {/* Collapsible Sections */}
      <div className="collapsible-section">
        <button
          className="section-toggle"
          onClick={() => setShowInputs(!showInputs)}
        >
          {showInputs ? '▼' : '▶'} Manage Inputs & Faculty
        </button>
        {showInputs && <InputManagement />}
      </div>

      <div className="collapsible-section">
        <button
          className="section-toggle"
          onClick={() => setShowConstraints(!showConstraints)}
        >
          {showConstraints ? '▼' : '▶'} Manage Constraints
        </button>
        {showConstraints && <ConstraintManager />}
      </div>

      {/* Generate Button */}
      <div className="generate-section card">
        <button
          onClick={handleGenerateTimetable}
          className="btn btn-generate"
          disabled={subjects.length === 0 || faculty.length === 0 || classrooms.length === 0}
        >
          🎯 Generate Timetable
        </button>
      </div>

      {/* Generated Timetable */}
      {generatedTimetable && (
        <GeneratedTimetableDisplay
          timetable={generatedTimetable}
          constraints={constraints}
        />
      )}
    </div>
  );
};

export default GeneratorPage;
