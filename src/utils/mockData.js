import { DEPARTMENTS, CLASSROOMS, TIME_SLOT_NUMBERS, SUBJECT_DIFFICULTY } from './constants';

// Mock Faculty Data
export const mockFacultyData = [
  { id: 'F001', name: 'Dr. Rajesh Kumar', department: 'CSE', specialization: 'Data Structures' },
  { id: 'F002', name: 'Prof. Anjali Sharma', department: 'CSE', specialization: 'Web Development' },
  { id: 'F003', name: 'Dr. Vikram Singh', department: 'CSE', specialization: 'Algorithms' },
  { id: 'F004', name: 'Prof. Neha Gupta', department: 'IT', specialization: 'Database Management' },
  { id: 'F005', name: 'Dr. Pradeep Patel', department: 'IT', specialization: 'Network Security' },
  { id: 'F006', name: 'Prof. Sneha Desai', department: 'IT', specialization: 'Cloud Computing' },
  { id: 'F007', name: 'Dr. Arjun Mishra', department: 'EXTC', specialization: 'Digital Logic' },
  { id: 'F008', name: 'Prof. Deepa Nair', department: 'EXTC', specialization: 'Embedded Systems' },
  { id: 'F009', name: 'Dr. Rahul Verma', department: 'CSE', specialization: 'Compiler Design' },
  { id: 'F010', name: 'Prof. Anita Bhatt', department: 'IT', specialization: 'Machine Learning' },
];

// Mock Subject Data
export const mockSubjectsData = [
  // CSE Subjects
  { id: 'S001', name: 'Data Structures', department: 'CSE', semester: 3, credits: 4 },
  { id: 'S002', name: 'Algorithms', department: 'CSE', semester: 4, credits: 4 },
  { id: 'S003', name: 'Operating Systems', department: 'CSE', semester: 5, credits: 4 },
  { id: 'S004', name: 'Compiler Design', department: 'CSE', semester: 6, credits: 4 },
  { id: 'S005', name: 'Web Development', department: 'CSE', semester: 4, credits: 3 },
  { id: 'S006', name: 'Python Programming', department: 'CSE', semester: 2, credits: 3 },
  { id: 'S007', name: 'Java Programming', department: 'CSE', semester: 3, credits: 3 },
  
  // IT Subjects
  { id: 'S008', name: 'Database Management', department: 'IT', semester: 3, credits: 4 },
  { id: 'S009', name: 'Network Security', department: 'IT', semester: 5, credits: 4 },
  { id: 'S010', name: 'Cloud Computing', department: 'IT', semester: 6, credits: 3 },
  { id: 'S011', name: 'C++ Programming', department: 'IT', semester: 2, credits: 3 },
  { id: 'S012', name: 'Machine Learning', department: 'IT', semester: 5, credits: 4 },
  
  // EXTC Subjects
  { id: 'S013', name: 'Digital Logic', department: 'EXTC', semester: 2, credits: 4 },
  { id: 'S014', name: 'Embedded Systems', department: 'EXTC', semester: 4, credits: 3 },
  { id: 'S015', name: 'Basic Electronics', department: 'EXTC', semester: 1, credits: 3 },
];

// Mock Classroom Data
export const mockClassroomsData = [
  { id: 'C001', name: 'A-101', capacity: 45, department: 'CSE', type: 'lecture' },
  { id: 'C002', name: 'A-102', capacity: 50, department: 'CSE', type: 'lecture' },
  { id: 'C003', name: 'A-103', capacity: 40, department: 'IT', type: 'lecture' },
  { id: 'C004', name: 'B-101', capacity: 45, department: 'IT', type: 'lecture' },
  { id: 'C005', name: 'B-102', capacity: 50, department: 'CSE', type: 'lecture' },
  { id: 'C006', name: 'C-101', capacity: 30, department: 'EXTC', type: 'lecture' },
  { id: 'C007', name: 'C-102', capacity: 35, department: 'EXTC', type: 'lecture' },
  { id: 'C008', name: 'LAB-1', capacity: 30, department: 'CSE', type: 'lab' },
  { id: 'C009', name: 'LAB-2', capacity: 30, department: 'IT', type: 'lab' },
  { id: 'C010', name: 'LAB-3', capacity: 25, department: 'EXTC', type: 'lab' },
];

// Generate mock timetable entries
const generateMockTimetables = () => {
  const timetables = [];
  const departments = ['CSE', 'IT', 'EXTC'];
  const semesters = [3, 4, 5];

  departments.forEach((dept) => {
    semesters.forEach((sem) => {
      // Generate multiple timetable options
      for (let option = 1; option <= 3; option++) {
        const entries = [];
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const timeSlots = [0, 1, 2, 3, 5, 6, 7]; // Skip lunch break (4)

        const relevantSubjects = mockSubjectsData.filter(
          (s) => s.department === dept && s.semester === sem
        );
        const relevantFaculty = mockFacultyData.filter((f) => f.department === dept);
        const relevantClassrooms = mockClassroomsData.filter(
          (c) => c.department === dept || c.type === 'shared'
        );

        let entryId = 0;
        days.forEach((day, dayIndex) => {
          const daySlots = option === 1 
            ? timeSlots 
            : timeSlots.filter((_, i) => (i + dayIndex * 2) % 3 !== 0);

          daySlots.forEach((timeSlot) => {
            if (relevantSubjects.length > 0 && relevantFaculty.length > 0) {
              const subject = relevantSubjects[entryId % relevantSubjects.length];
              const faculty = relevantFaculty[entryId % relevantFaculty.length];
              const classroom =
                relevantClassrooms[entryId % relevantClassrooms.length];

              entries.push({
                id: `TT-${dept}-${sem}-${option}-${entryId}`,
                subject: subject.name,
                faculty: faculty.name,
                classroom: classroom.name,
                day: day,
                timeSlot: timeSlot,
                startTime: TIME_SLOT_NUMBERS[timeSlot].split(' - ')[0],
                endTime: TIME_SLOT_NUMBERS[timeSlot].split(' - ')[1],
                department: dept,
                semester: sem,
              });

              entryId++;
            }
          });
        });

        timetables.push({
          id: `TIMETABLE-${dept}-${sem}-${option}`,
          department: dept,
          semester: sem,
          optionNumber: option,
          entries: entries,
          optimizationScore: 75 + Math.random() * 20,
          createdAt: new Date().toISOString(),
        });
      }
    });
  });

  return timetables;
};

export const mockTimetablesData = generateMockTimetables();

// Helper function to get mock data
export const getMockData = () => ({
  faculty: mockFacultyData,
  subjects: mockSubjectsData,
  classrooms: mockClassroomsData,
  timetables: mockTimetablesData,
});

// Load or initialize mock data in localStorage
export const initializeMockData = () => {
  const existingData = localStorage.getItem('timetableData');
  if (!existingData) {
    const mockData = getMockData();
    localStorage.setItem('timetableData', JSON.stringify(mockData));
    return mockData;
  }
  return JSON.parse(existingData);
};
