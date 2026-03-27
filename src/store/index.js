import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./inputSlice";
import constraintReducer from "./constraintSlice";
import timetableReducer from "./timetableSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    inputs: inputReducer,
    constraints: constraintReducer,
    timetables: timetableReducer,
    ui: uiReducer,
  },
});

export default store;
