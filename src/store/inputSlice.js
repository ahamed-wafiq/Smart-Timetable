import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subjects: [],
  faculty: [],
  classrooms: [],
  selectedDepartment: "CSE",
};

const inputSlice = createSlice({
  name: "inputs",
  initialState,
  reducers: {
    addSubject: (state, action) => {
      state.subjects.push(action.payload);
    },
    removeSubject: (state, action) => {
      state.subjects = state.subjects.filter(
        (subject) => subject.id !== action.payload,
      );
      state.faculty = state.faculty.filter(
        (member) => member.assignedSubject !== action.payload,
      );
    },
    addFaculty: (state, action) => {
      state.faculty.push(action.payload);
    },
    removeFaculty: (state, action) => {
      state.faculty = state.faculty.filter(
        (member) => member.id !== action.payload,
      );
    },
    addClassroom: (state, action) => {
      state.classrooms.push(action.payload);
    },
    removeClassroom: (state, action) => {
      state.classrooms = state.classrooms.filter(
        (room) => room.id !== action.payload,
      );
    },
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
    },
  },
});

export const {
  addSubject,
  removeSubject,
  addFaculty,
  removeFaculty,
  addClassroom,
  removeClassroom,
  setSelectedDepartment,
} = inputSlice.actions;

export default inputSlice.reducer;
