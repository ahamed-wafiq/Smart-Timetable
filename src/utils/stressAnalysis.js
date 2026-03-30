import { SUBJECT_DIFFICULTY, STRESS_THRESHOLDS, TIME_SLOTS } from './constants';

/**
 * Convert a timeSlot (string like '08:45 - 09:45' or integer) to a numeric index.
 * This ensures gap calculations work regardless of data source.
 */
const toSlotIndex = (timeSlot) => {
  if (typeof timeSlot === 'number') return timeSlot;
  const idx = TIME_SLOTS.indexOf(timeSlot);
  // fallback: try parseInt (for old integer-string entries like "0", "1" ...)
  return idx >= 0 ? idx : (parseInt(timeSlot) || 0);
};

/**
 * Calculate stress score for a single day's timetable
 * Returns a score from 0-100
 */
export const calculateDayStressScore = (dayEntries) => {
  if (!dayEntries || dayEntries.length === 0) {
    return 0;
  }

  // Sort entries by their slot index so gap math is correct
  const sorted = [...dayEntries].sort(
    (a, b) => toSlotIndex(a.timeSlot) - toSlotIndex(b.timeSlot)
  );

  let stressScore = 0;

  // 1. Lecture count penalty – more lectures = more stress
  const consecutiveCount = sorted.length;
  stressScore += Math.min(consecutiveCount * 8, 25); // Max 25 points

  // 2. Gaps between lectures penalty
  const gaps = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = toSlotIndex(sorted[i].timeSlot) + 1;
    const nextStart = toSlotIndex(sorted[i + 1].timeSlot);
    gaps.push(nextStart - currentEnd);
  }

  let gapPenalty = 0;
  gaps.forEach((gap) => {
    if (gap > 2) gapPenalty += 3;   // too large a gap (wasted time)
    else if (gap < 1) gapPenalty += 5; // back-to-back with no break
  });
  stressScore += Math.min(gapPenalty, 20); // Max 20 points

  // 3. Hard subject clustering penalty
  let hardSubjectCluster = 0;
  let currentHardCount = 0;
  sorted.forEach((entry) => {
    const difficulty = SUBJECT_DIFFICULTY[entry.subject] || 'medium';
    if (difficulty === 'hard') {
      currentHardCount++;
      if (currentHardCount > 1) {
        hardSubjectCluster += currentHardCount * 5;
      }
    } else {
      currentHardCount = 0;
    }
  });
  stressScore += Math.min(hardSubjectCluster, 30); // Max 30 points

  return Math.min(stressScore, 100);
};

/**
 * Calculate overall stress metrics for a week's timetable
 */
export const calculateWeeklyStressMetrics = (timetableEntries) => {
  // Include Saturday if entries exist for it
  const allDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const daysWithEntries = allDays.filter((d) =>
    timetableEntries.some((e) => e.day === d)
  );
  const days = daysWithEntries.length > 0 ? daysWithEntries : allDays.slice(0, 5);

  const dayMetrics = {};
  const dayStressScores = {};

  days.forEach((day) => {
    const dayEntries = timetableEntries.filter((e) => e.day === day);
    const stressScore = calculateDayStressScore(dayEntries);

    // Sort for correct gap computation
    const sorted = [...dayEntries].sort(
      (a, b) => toSlotIndex(a.timeSlot) - toSlotIndex(b.timeSlot)
    );

    const gaps = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const currentEnd = toSlotIndex(sorted[i].timeSlot) + 1;
      const nextStart = toSlotIndex(sorted[i + 1].timeSlot);
      gaps.push(nextStart - currentEnd);
    }

    const hardSubjects = dayEntries.filter(
      (e) => SUBJECT_DIFFICULTY[e.subject] === 'hard'
    ).length;

    dayMetrics[day] = {
      consecutiveLectures: dayEntries.length,
      gapsBetweenLectures: gaps.filter((g) => g > 0).length,
      hardSubjects,
      totalLectures: dayEntries.length,
    };

    dayStressScores[day] = stressScore;
  });

  const warnings = generateStressWarnings(dayMetrics, dayStressScores);
  const scores = Object.values(dayStressScores);
  const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);

  return {
    dayMetrics,
    dayStressScores,
    warnings,
    averageStress: avg,
  };
};

/**
 * Generate human-readable warnings based on stress analysis
 */
const generateStressWarnings = (dayMetrics, dayStressScores) => {
  const warnings = [];

  Object.entries(dayMetrics).forEach(([day, metrics]) => {
    const stressScore = dayStressScores[day];

    // Check for overload
    if (metrics.consecutiveLectures > 6) {
      warnings.push({
        type: 'overload',
        severity: 'high',
        day: day,
        message: `${day} is heavily overloaded with ${metrics.consecutiveLectures} lectures`,
      });
    }

    // Check for too many gaps
    if (metrics.gapsBetweenLectures > 3) {
      warnings.push({
        type: 'gaps',
        severity: 'medium',
        day: day,
        message: `${day} has too many gaps between lectures (${metrics.gapsBetweenLectures})`,
      });
    }

    // Check for heavy subject clustering
    if (metrics.hardSubjects > 3) {
      warnings.push({
        type: 'difficulty',
        severity: 'medium',
        day: day,
        message: `${day} has ${metrics.hardSubjects} difficult subjects clustered`,
      });
    }

    // General stress level
    if (stressScore > 70) {
      warnings.push({
        type: 'stress',
        severity: 'high',
        day: day,
        message: `${day} has a high stress score of ${Math.round(stressScore)}`,
      });
    }
  });

  return warnings;
};

/**
 * Get stress level category based on score
 */
export const getStressLevel = (score) => {
  if (score <= STRESS_THRESHOLDS.LOW.max) {
    return { ...STRESS_THRESHOLDS.LOW, score };
  } else if (score <= STRESS_THRESHOLDS.MEDIUM.max) {
    return { ...STRESS_THRESHOLDS.MEDIUM, score };
  } else if (score <= STRESS_THRESHOLDS.HIGH.max) {
    return { ...STRESS_THRESHOLDS.HIGH, score };
  } else {
    return { ...STRESS_THRESHOLDS.CRITICAL, score };
  }
};

/**
 * Check hard constraints (must always be satisfied)
 */
export const checkHardConstraints = (entries) => {
  const violations = [];

  // Check for faculty clash
  const facultyTimeMap = {};
  entries.forEach((entry) => {
    const key = `${entry.faculty}-${entry.day}-${entry.timeSlot}`;
    if (facultyTimeMap[key]) {
      violations.push({
        type: 'faculty_clash',
        detail: `${entry.faculty} has multiple classes at same time on ${entry.day}`,
      });
    }
    facultyTimeMap[key] = true;
  });

  // Check for classroom clash
  const classroomTimeMap = {};
  entries.forEach((entry) => {
    const key = `${entry.classroom}-${entry.day}-${entry.timeSlot}`;
    if (classroomTimeMap[key]) {
      violations.push({
        type: 'classroom_clash',
        detail: `${entry.classroom} is assigned to multiple classes at same time on ${entry.day}`,
      });
    }
    classroomTimeMap[key] = true;
  });

  return violations;
};

/**
 * Calculate optimization score for a timetable
 * Considers soft constraints satisfaction
 */
export const calculateOptimizationScore = (timetableEntries) => {
  let score = 100;
  const hardConstraintViolations = checkHardConstraints(timetableEntries);

  if (hardConstraintViolations.length > 0) {
    return 0; // Failed hard constraints
  }

  // Soft constraint penalties
  const weeklyMetrics = calculateWeeklyStressMetrics(timetableEntries);

  // Penalty for high stress days
  Object.values(weeklyMetrics.dayStressScores).forEach((dayScore) => {
    if (dayScore > 70) {
      score -= 5;
    } else if (dayScore > 50) {
      score -= 2;
    }
  });

  // Bonus for balanced stress
  const stressVariance =
    Math.max(...Object.values(weeklyMetrics.dayStressScores)) -
    Math.min(...Object.values(weeklyMetrics.dayStressScores));
  if (stressVariance < 20) {
    score += 10;
  } else if (stressVariance < 35) {
    score += 5;
  }

  // Penalty for large gaps
  Object.values(weeklyMetrics.dayMetrics).forEach((metrics) => {
    if (metrics.gapsBetweenLectures > 2) {
      score -= 2;
    }
  });

  return Math.max(75, Math.min(99, score));
};
