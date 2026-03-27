import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDepartment: 'CSE',
  selectedSemester: 3,
  timetables: [],
};

const timetableSlice = createSlice({
  name: 'timetables',
  initialState,
  reducers: {
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
    setSelectedSemester: (state, action) => {
      state.selectedSemester = action.payload;
    },
    setTimetables: (state, action) => {
      state.timetables = action.payload;
    },
  },
});

export const { setSelectedDepartment, setSelectedSemester, setTimetables } = timetableSlice.actions;

export default timetableSlice.reducer;
