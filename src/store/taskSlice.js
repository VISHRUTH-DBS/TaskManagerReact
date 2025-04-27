import { createSlice } from "@reduxjs/toolkit";

// Safely initialize the state with data from localStorage
const loadTasksFromLocalStorage = () => {
  try {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    // Ensure it's an array, else return empty array
    return Array.isArray(tasks) ? tasks : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

// Initialize the state
const initialState = loadTasksFromLocalStorage();

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(), // unique id based on timestamp
        title: action.payload.title,
        description: action.payload.description,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        status: action.payload.status || "Pending",
        assignee: action.payload.assignee || "",
        priority: action.payload.priority || "P0", // Default to "P0" priority
      };
      state.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(state)); // Update localStorage after adding the task
    },
    removeTask: (state, action) => {
      const taskIndex = state.findIndex((task) => task.id === action.payload);
      if (taskIndex !== -1) {
        state.splice(taskIndex, 1); // Remove the task
        localStorage.setItem("tasks", JSON.stringify(state)); // Update localStorage
      }
    },
    toggleTaskCompleted: (state, action) => {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        if (task.status !== "Completed") {
          task.status = "Completed";
          task.endDate = new Date().toISOString(); // Set endDate when completed
        } else {
          task.status = "Pending";
          task.endDate = null; // Clear endDate when set back to "Pending"
        }
        localStorage.setItem("tasks", JSON.stringify(state)); // Update localStorage
      }
    },
    updateTask: (state, action) => {
      const { id, ...updatedTaskFields } = action.payload;
      const taskIndex = state.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state[taskIndex] = { ...state[taskIndex], ...updatedTaskFields };
        localStorage.setItem("tasks", JSON.stringify(state)); // Update localStorage after update
      }
    },
  },
});

// Export actions for dispatching
export const { addTask, removeTask, toggleTaskCompleted, updateTask } = taskSlice.actions;

// Export the reducer for use in the store
export default taskSlice.reducer;

// Selector to access all tasks from the state
export const selectAllTasks = (state) => state.tasks;
