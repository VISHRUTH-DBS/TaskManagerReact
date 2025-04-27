import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice"; // Import your task slice reducer

// Configure the store
export const store = configureStore({
  reducer: {
    tasks: taskReducer, // Add the task reducer under the 'tasks' key
  },
});
