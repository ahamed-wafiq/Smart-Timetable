import { configureStore } from '@reduxjs/toolkit';
import timetableReducer from './timetableSlice';
import uiReducer from './uiSlice';
import inputReducer from './inputSlice';
import constraintReducer from './constraintSlice';

const store = configureStore({
  reducer: {
    timetables: timetableReducer,
    ui: uiReducer,
    inputs: inputReducer,
    constraints: constraintReducer,
  },
});

export default store;
