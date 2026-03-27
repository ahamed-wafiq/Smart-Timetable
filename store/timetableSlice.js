import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timetables: [],
  selectedTimetable: null,
  selectedDepartment: 'CSE',
  selectedSemester: 3,
  loading: false,
  error: null,
};

const timetableSlice = createSlice({
  name: 'timetables',
  initialState,
  reducers: {
    setTimetables: (state, action) => {
      state.timetables = action.payload;
    },
    selectTimetable: (state, action) => {
      state.selectedTimetable = action.payload;
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setSelectedSemester: (state, action) => {
      state.selectedSemester = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTimetables,
  selectTimetable,
  setSelectedDepartment,
  setSelectedSemester,
  setLoading,
  setError,
} = timetableSlice.actions;

export default timetableSlice.reducer;
