// Constants and types for the timetable app

export const DEPARTMENTS = {
  CSE: 'Computer Science & Engineering',
  IT: 'Information Technology',
  EXTC: 'Electronics & Telecommunication'
};

export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const TIME_SLOTS = [
  '08:00 - 09:00',
  '09:00 - 10:00',
  '10:00 - 11:00',
  '11:00 - 12:00',
  '12:00 - 13:00',
  '13:00 - 14:00',
  '14:00 - 15:00',
  '15:00 - 16:00',
  '16:00 - 17:00',
];

export const CLASSROOMS = [
  'A-101', 'A-102', 'A-103', 'A-104',
  'B-101', 'B-102', 'B-103',
  'C-101', 'C-102', 'C-103',
  'LAB-1', 'LAB-2', 'LAB-3'
];

export const TIME_SLOT_NUMBERS = {
  0: '08:00 - 09:00',
  1: '09:00 - 10:00',
  2: '10:00 - 11:00',
  3: '11:00 - 12:00',
  4: '12:00 - 13:00',
  5: '13:00 - 14:00',
  6: '14:00 - 15:00',
  7: '15:00 - 16:00',
  8: '16:00 - 17:00',
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

// Colors for UI
export const DEPARTMENT_COLORS = {
  CSE: '#6366f1',
  IT: '#8b5cf6',
  EXTC: '#ec4899',
};

export const SUBJECT_DIFFICULTY_COLORS = {
  easy: '#10b981',
  medium: '#f59e0b',
  hard: '#ef4444',
};
