import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  currentPage: "dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setCurrentPage } =
  uiSlice.actions;

export default uiSlice.reducer;
