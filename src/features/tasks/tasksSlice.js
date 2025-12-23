import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  pagination: {
    current_page: 1,
    total: 0,
  },
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    //Set danh sách task
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.page = 1; // Reset page về 1
    },
    resetTasks: (state) => {
      state.tasks = [];
      state.pagination = initialState.pagination;
    },

    appendTasks: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateTask: (state, action) => {
      state.tasks.find((task) => {
        if (task.id === action.payload.id) {
          return (task.title = action.payload.title);
        }
      });
    },
    setHasMore: (state, action) => {
      state.hasMore = action.payload;
    },
    //Đếm số page
    incrementPage: (state) => {
      state.page += 1;
    },

    addTaskToList: (state, action) => {
      state.tasks.unshift(action.payload);
    },
    removeTaskFromList: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
});

export const {
  setTasks,
  resetTasks,
  appendTasks,

  setError,
  setHasMore,
  incrementPage,

  updateTask,
  addTaskToList,
  removeTaskFromList,
} = tasksSlice.actions;

export const { reducerPath } = tasksSlice.reducerPath;

export default tasksSlice.reducer;
