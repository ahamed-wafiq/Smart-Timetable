// Constants and types for the timetable app

export const DEPARTMENTS = {
  CSE: 'Computer Science & Engineering',
  IT: 'Information Technology',
  EXTC: 'Electronics & Telecommunication'
  , MECH: 'Mechanical'
};

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const TIME_SLOTS = [
  '08:45 - 09:45',
  '09:45 - 10:45',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:30 - 14:30',
  '14:30 - 15:30',
  '15:30 - 16:30',
  '16:30 - 17:30',
];


export const CLASSROOMS = [
  'A-101', 'A-102', 'A-103', 'A-104',
  'B-101', 'B-102', 'B-103',
  'C-101', 'C-102', 'C-103',
  'LAB-1', 'LAB-2', 'LAB-3'
];

export const TIME_SLOT_NUMBERS = {
  0: '08:45 - 09:45',
  1: '09:45 - 10:45',
  2: '11:00 - 12:00',
  3: '12:00 - 13:00',
  4: '13:30 - 14:30',
  5: '14:30 - 15:30',
  6: '15:30 - 16:30',
  7: '16:30 - 17:30',
};

export const SUBJECT_DIFFICULTY = {
  'Data Structures': 'hard',
  'Algorithms': 'hard',
  'Operating Systems': 'hard',
  'Database Management': 'hard',
  'Compiler Design': 'hard',
  'Web Development': 'medium',
  'Python Programming': 'medium',
  'Java Programming': 'medium',
  'C++ Programming': 'medium',
  'Basic Electronics': 'easy',
  'Digital Logic': 'medium',
  'Network Security': 'hard',
  'Machine Learning': 'hard',
  'English': 'easy',
  'Mathematics': 'medium',
};

// Stress thresholds
export const STRESS_THRESHOLDS = {
  LOW: { max: 30, label: 'Low', color: '#10b981' },
  MEDIUM: { max: 60, label: 'Medium', color: '#f59e0b' },
  HIGH: { max: 85, label: 'High', color: '#ef4444' },
  CRITICAL: { label: 'Critical', color: '#7c3aed' }
};
