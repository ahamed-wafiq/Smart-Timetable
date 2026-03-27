import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputManagement from '../components/InputManagement';
import ConstraintManager from '../components/ConstraintManager';
import GeneratedTimetableDisplay from '../components/GeneratedTimetableDisplay';
import { generateTimetableWithConstraints, timetableToArray } from '../utils/timetableGenerator';
import { calculateOptimizationScore } from '../utils/stressAnalysis';
import { addTimetable } from '../store/timetableSlice';
import '../styles/generator-page.css';

const GeneratorPage = () => {
  const dispatch = useDispatch();
  const { subjects, faculty, classrooms, selectedDepartment } = useSelector((state) => state.inputs);
  const constraints = useSelector((state) => state.constraints);
  const { timetables } = useSelector((state) => state.timetables);
  
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [showInputs, setShowInputs] = useState(true);
  const [showConstraints, setShowConstraints] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState(3);

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

    const flatEntries = timetableToArray(timetable);
    const score = calculateOptimizationScore(flatEntries);

    const relatedTimetables = timetables.filter(
      (t) => t.department === selectedDepartment && t.semester === selectedSemester
    );

    const newTimetable = {
      id: `TT-${Date.now()}`,
      department: selectedDepartment,
      semester: selectedSemester,
      optionNumber: relatedTimetables.length + 1,
      entries: flatEntries,
      optimizationScore: score,
      createdAt: new Date().toISOString(),
      grid: timetable
    };

    dispatch(addTimetable(newTimetable));
    setGeneratedTimetable(timetable);
  };

  return (
    <div className="generator-page page-content">
      <div className="page-header">
        <h1>⚙️ Timetable Generator</h1>
        <p>Create custom timetables with constraints and exceptions</p>
      </div>

      <div className="generator-settings card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Target Semester:</h3>
        <select 
          value={selectedSemester} 
          onChange={(e) => setSelectedSemester(Number(e.target.value))}
          className="input-field"
          style={{ width: '150px', marginBottom: 0 }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <option key={sem} value={sem}>Semester {sem}</option>
          ))}
        </select>
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
