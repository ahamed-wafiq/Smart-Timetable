import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
const customStorage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key, value) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

import inputReducer from './inputSlice';
import constraintReducer from './constraintSlice';
import timetableReducer from './timetableSlice';
import uiReducer from './uiSlice';

const rootReducer = combineReducers({
  inputs: inputReducer,
  constraints: constraintReducer,
  timetables: timetableReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: customStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
