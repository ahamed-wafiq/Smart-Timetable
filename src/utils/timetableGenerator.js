import { DAYS_OF_WEEK, TIME_SLOTS } from './constants';

/**
 * Generate timetable respecting constraints
 */
export const generateTimetableWithConstraints = (
  subjects,
  faculty,
  classrooms,
  constraints
) => {
  const { reservedClassrooms, facultyUnavailability, fixedLectures } =
    constraints;

  // Initialize empty timetable grid
  const timetable = {};
  DAYS_OF_WEEK.forEach((day) => {
    timetable[day] = {};
    TIME_SLOTS.forEach((slot) => {
      timetable[day][slot] = null;
    });
  });

  // Place fixed lectures first
  fixedLectures.forEach((fixed) => {
    if (
      timetable[fixed.day] &&
      timetable[fixed.day][fixed.timeSlot] !== undefined
    ) {
      timetable[fixed.day][fixed.timeSlot] = {
        subject: fixed.subject,
        faculty: fixed.faculty,
        room: fixed.room,
        isFixed: true,
      };
    }
  });

  // Try to place subjects
  const usedSlotsForSubject = {};
  const usedSlotsForFaculty = {};

  subjects.forEach((subject) => {
    usedSlotsForSubject[subject.id] = 0;
    const lecturesPerWeek = parseInt(subject.lecturesPerWeek) || 1;

    for (let i = 0; i < lecturesPerWeek; i++) {
      let placed = false;

      // Try each day and slot
      for (let dayIdx = 0; dayIdx < DAYS_OF_WEEK.length && !placed; dayIdx++) {
        const day = DAYS_OF_WEEK[dayIdx];

        for (let slotIdx = 0; slotIdx < TIME_SLOTS.length && !placed; slotIdx++) {
          const slot = TIME_SLOTS[slotIdx];

          // Check if slot is already occupied
          if (timetable[day][slot] !== null) {
            continue;
          }

          // Check reserved classroom constraint
          const isReserved = reservedClassrooms.some(
            (r) => r.day === day && r.timeSlot === slot
          );
          if (isReserved) {
            continue;
          }

          // Find available faculty
          const availableFaculty = faculty.find((f) => {
            const isFacultyAvailable = !facultyUnavailability.some(
              (fu) => fu.faculty === f.id && fu.day === day && fu.timeSlot === slot
            );

            const isFacultyAssignedToThisSubject = f.assignedSubject === subject.id;
            const slotCountForFaculty = usedSlotsForFaculty[f.id] || 0;

            return (
              isFacultyAvailable &&
              isFacultyAssignedToThisSubject &&
              slotCountForFaculty < 5
            );
          });

          if (!availableFaculty) {
            continue;
          }

          // Find available classroom
          const availableClassroom = classrooms.find((c) => {
            const isClassroomReserved = reservedClassrooms.some(
              (r) =>
                r.classroom === c.id && r.day === day && r.timeSlot === slot
            );

            return !isClassroomReserved;
          });

          if (!availableClassroom) {
            continue;
          }

          // Place lecture in timetable
          timetable[day][slot] = {
            subject: subject.name,
            faculty: availableFaculty.name,
            room: availableClassroom.name,
            isFixed: false,
          };

          usedSlotsForSubject[subject.id]++;
          usedSlotsForFaculty[availableFaculty.id] =
            (usedSlotsForFaculty[availableFaculty.id] || 0) + 1;
          placed = true;
        }
      }
    }
  });

  return timetable;
};

/**
 * Check if a slot is reserved (returns color if reserved)
 */
export const getSlotStatus = (day, timeSlot, constraints) => {
  const { reservedClassrooms, fixedLectures } = constraints;

  // Check if fixed
  const isFixed = fixedLectures.some(
    (f) => f.day === day && f.timeSlot === timeSlot
  );
  if (isFixed) return 'fixed'; // Green

  // Check if reserved
  const isReserved = reservedClassrooms.some(
    (r) => r.day === day && r.timeSlot === timeSlot
  );
  if (isReserved) return 'reserved'; // Red

  return 'normal'; // Regular
};

/**
 * Convert timetable grid to array format for easier filtering
 */
export const timetableToArray = (timetable) => {
  const array = [];

  Object.entries(timetable).forEach(([day, slots]) => {
    Object.entries(slots).forEach(([timeSlot, lecture]) => {
      if (lecture) {
        array.push({
          day,
          timeSlot,
          ...lecture,
        });
      }
    });
  });

  return array;
};

/**
 * Filter timetable entries
 */
export const filterTimetable = (entries, filters) => {
  return entries.filter((entry) => {
    if (
      filters.faculty &&
      entry.faculty.toLowerCase() !== filters.faculty.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.subject &&
      entry.subject.toLowerCase() !== filters.subject.toLowerCase()
    ) {
      return false;
    }
    if (
      filters.room &&
      entry.room.toLowerCase() !== filters.room.toLowerCase()
    ) {
      return false;
    }
    return true;
  });
};
