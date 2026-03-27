import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reservedClassrooms: [],
  facultyUnavailability: [],
  fixedLectures: [],
};

const constraintSlice = createSlice({
  name: "constraints",
  initialState,
  reducers: {
    addReservedClassroom: (state, action) => {
      state.reservedClassrooms.push({ id: Date.now(), ...action.payload });
    },
    removeReservedClassroom: (state, action) => {
      state.reservedClassrooms = state.reservedClassrooms.filter(
        (item) => item.id !== action.payload,
      );
    },
    addFacultyUnavailability: (state, action) => {
      state.facultyUnavailability.push({ id: Date.now(), ...action.payload });
    },
    removeFacultyUnavailability: (state, action) => {
      state.facultyUnavailability = state.facultyUnavailability.filter(
        (item) => item.id !== action.payload,
      );
    },
    addFixedLecture: (state, action) => {
      state.fixedLectures.push({ id: Date.now(), ...action.payload });
    },
    removeFixedLecture: (state, action) => {
      state.fixedLectures = state.fixedLectures.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const {
  addReservedClassroom,
  removeReservedClassroom,
  addFacultyUnavailability,
  removeFacultyUnavailability,
  addFixedLecture,
  removeFixedLecture,
} = constraintSlice.actions;

export default constraintSlice.reducer;
