import { addTimetable } from '../store/timetableSlice';
import { addSubject, addFaculty, addClassroom, setSelectedDepartment } from '../store/inputSlice';
import { calculateOptimizationScore } from './stressAnalysis';

export const loadSEComputerCTemplate = (dispatch) => {
  // 1. Initial configuration
  dispatch(setSelectedDepartment('CSE'));

  // 2. Insert Subjects
  const subjects = [
    { id: 'S1', name: 'FSD', lecturesPerWeek: 4 },
    { id: 'S2', name: 'AoA', lecturesPerWeek: 4 },
    { id: 'S3', name: 'DBMS', lecturesPerWeek: 4 },
    { id: 'S4', name: 'Minor', lecturesPerWeek: 5 },
    { id: 'S5', name: 'SPD', lecturesPerWeek: 1 },
    { id: 'S6', name: 'Lab (PVS)', lecturesPerWeek: 3 },
    { id: 'S7', name: 'FCBS', lecturesPerWeek: 1 },
    { id: 'S8', name: 'TED', lecturesPerWeek: 1 },
    { id: 'S9', name: 'OS', lecturesPerWeek: 2 },
    { id: 'S10', name: 'TE', lecturesPerWeek: 1 },
    { id: 'S11', name: 'OE', lecturesPerWeek: 2 },
    { id: 'S12', name: 'Mini Project / Elective', lecturesPerWeek: 2 },
    { id: 'S13', name: 'MDM-3', lecturesPerWeek: 2 },
  ];
  subjects.forEach(s => dispatch(addSubject(s)));

  // 3. Insert Faculty
  const faculty = [
    { id: 'F1', name: 'Prof. Rohin Padate', assignedSubject: 'S1' },
    { id: 'F2', name: 'Dr. Rajan Deshmukh', assignedSubject: 'S2' },
    { id: 'F3', name: 'Dr. M. Veerabhadrappa', assignedSubject: 'S3' },
    { id: 'F4', name: 'Prof. Onkar Parder', assignedSubject: 'S4' },
    { id: 'F5', name: 'Prof. Snehan Agate', assignedSubject: 'S5' },
    { id: 'F6', name: 'Dr. Prasad Thakur', assignedSubject: 'S6' },
    { id: 'F7', name: 'Dr. Anu Gupta', assignedSubject: 'S7' },
    { id: 'F8', name: 'Dr. Abhijit Tembe', assignedSubject: 'S8' },
    { id: 'F9', name: 'Dr. Piyali Das', assignedSubject: 'S9' },
    { id: 'F10', name: 'Class Teacher (Dr. Rohin Padate)', assignedSubject: 'S12' },
  ];
  faculty.forEach(f => dispatch(addFaculty(f)));

  // 4. Insert Classrooms
  const classrooms = [
    { id: 'C1', name: 'S.E Computer C - Main Room', capacity: 60, type: 'lecture' },
    { id: 'C2', name: 'PVS Lab', capacity: 30, type: 'lab' }
  ];
  classrooms.forEach(c => dispatch(addClassroom(c)));

  // 5. Structure Timetable Grid exactly as the user requested
  const timetableObj = {
    Monday: {
      '08:45 - 09:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '11:00 - 12:00': { subject: 'AoA', faculty: 'Dr. Rajan Deshmukh', room: 'S.E Computer C - Main Room', isFixed: true },
      '12:00 - 13:00': { subject: 'AoA', faculty: 'Dr. Rajan Deshmukh', room: 'S.E Computer C - Main Room', isFixed: true },
      '13:30 - 14:30': { subject: 'DBMS', faculty: 'Dr. M. Veerabhadrappa', room: 'S.E Computer C - Main Room', isFixed: true },
      '14:30 - 15:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
      '15:30 - 16:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
    },
    Tuesday: {
      '08:45 - 09:45': { subject: 'DBMS', faculty: 'Dr. M. Veerabhadrappa', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'SPD', faculty: 'Prof. Snehan Agate', room: 'S.E Computer C - Main Room', isFixed: true },
      '11:00 - 12:00': { subject: 'Lab (PVS)', faculty: 'Dr. Prasad Thakur', room: 'PVS Lab', isFixed: true },
      '12:00 - 13:00': { subject: 'FCBS', faculty: 'Dr. Anu Gupta', room: 'S.E Computer C - Main Room', isFixed: true },
      '13:30 - 14:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
      '14:30 - 15:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
      '15:30 - 16:30': { subject: 'TED', faculty: 'Dr. Abhijit Tembe', room: 'S.E Computer C - Main Room', isFixed: true },
    },
    Wednesday: {
      '08:45 - 09:45': { subject: 'OS', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'OS', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
      '11:00 - 12:00': { subject: 'DBMS', faculty: 'Dr. M. Veerabhadrappa', room: 'S.E Computer C - Main Room', isFixed: true },
      '12:00 - 13:00': { subject: 'AoA', faculty: 'Dr. Rajan Deshmukh', room: 'S.E Computer C - Main Room', isFixed: true },
      '13:30 - 14:30': { subject: 'TE', faculty: 'Prof. Snehan Agate', room: 'S.E Computer C - Main Room', isFixed: true },
      '14:30 - 15:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
      '15:30 - 16:30': { subject: 'Minor', faculty: 'Prof. Onkar Parder', room: 'S.E Computer C - Main Room', isFixed: true },
    },
    Thursday: {
      '08:45 - 09:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '11:00 - 12:00': { subject: 'AoA', faculty: 'Dr. Rajan Deshmukh', room: 'S.E Computer C - Main Room', isFixed: true },
      '12:00 - 13:00': { subject: 'AoA', faculty: 'Dr. Rajan Deshmukh', room: 'S.E Computer C - Main Room', isFixed: true },
      '13:30 - 14:30': { subject: 'OE', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
      '14:30 - 15:30': { subject: 'Lab (PVS)', faculty: 'Dr. Prasad Thakur', room: 'PVS Lab', isFixed: true },
    },
    Friday: {
      '08:45 - 09:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'FSD', faculty: 'Prof. Rohin Padate', room: 'S.E Computer C - Main Room', isFixed: true },
      '11:00 - 12:00': { subject: 'OE', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
      '12:00 - 13:00': { subject: 'Lab (PVS)', faculty: 'Dr. Prasad Thakur', room: 'PVS Lab', isFixed: true },
      '13:30 - 14:30': { subject: 'Mini Project / Elective', faculty: 'Class Teacher (Dr. Rohin Padate)', room: 'S.E Computer C - Main Room', isFixed: true },
      '14:30 - 15:30': { subject: 'Mini Project / Elective', faculty: 'Class Teacher (Dr. Rohin Padate)', room: 'S.E Computer C - Main Room', isFixed: true },
    },
    Saturday: {
      '08:45 - 09:45': { subject: 'MDM-3', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
      '09:45 - 10:45': { subject: 'MDM-3', faculty: 'Dr. Piyali Das', room: 'S.E Computer C - Main Room', isFixed: true },
    }
  };

  // 6. Convert to standard format
  const arrayEntries = [];
  Object.entries(timetableObj).forEach(([day, slots]) => {
    Object.entries(slots).forEach(([timeSlot, lecture]) => {
      arrayEntries.push({
        day,
        timeSlot,
        ...lecture
      });
    });
  });

  // Calculate generic score
  const score = calculateOptimizationScore(arrayEntries);

  // 7. Push to timetable global store representing Semester 3
  dispatch(addTimetable({
    id: `TT-TEMPLATE-SE-${Date.now()}`,
    department: 'CSE',
    semester: 3,
    optionNumber: 1,
    entries: arrayEntries,
    optimizationScore: score,
    createdAt: new Date().toISOString(),
    grid: timetableObj
  }));

  // Important return for notifications
  return true;
};
