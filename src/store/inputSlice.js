import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subjects: [],
  faculty: [],
  classrooms: [],
  selectedDepartment: 'CSE',
};

const inputSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    setSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter((s) => s.id !== action.payload);
    },
    setFaculty: (state, action) => {
      state.faculty = action.payload;
    },
    addFaculty: (state, action) => {
      state.faculty.push(action.payload);
    },
    removeFaculty: (state, action) => {
      state.faculty = state.faculty.filter((f) => f.id !== action.payload);
    },
    setClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },
    addClassroom: (state, action) => {
      state.classrooms.push(action.payload);
    },
    removeClassroom: (state, action) => {
      state.classrooms = state.classrooms.filter((c) => c.id !== action.payload);
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export const {
  setSubjects,
  addSubject,
  removeSubject,
  setFaculty,
  addFaculty,
  removeFaculty,
  setClassrooms,
  addClassroom,
  removeClassroom,
  setSelectedDepartment,
} = inputSlice.actions;

export default inputSlice.reducer;
