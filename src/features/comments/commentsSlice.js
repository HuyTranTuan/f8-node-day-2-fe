import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comments: [],
  pagination: {
    current_page: 1,
    total: 0,
  },
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    //Set danh sách comment
    setComments: (state, action) => {
      state.comments = action.payload;
      state.page = 1; // Reset page về 1
    },
    resetComments: (state) => {
      state.comments = [];
      state.pagination = initialState.pagination;
    },

    appendComments: (state, action) => {
      state.comments = [action.payload, ...state.comments];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateComment: (state, action) => {
      state.comments.find((comment) => {
        if (comment.id === action.payload.id) {
          return (comment.title = action.payload.title);
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

    addCommentToList: (state, action) => {
      state.comments.unshift(action.payload);
    },
    removeCommentFromList: (state, action) => {
      const commentId = action.payload;
      state.comments = state.comments.filter(
        (comment) => comment.id !== commentId,
      );
    },
  },
});

export const {
  setComments,
  resetComments,
  appendComments,

  setError,
  setHasMore,
  incrementPage,

  updateComment,
  addCommentToList,
  removeCommentFromList,
} = commentsSlice.actions;

export const { reducerPath } = commentsSlice.reducerPath;

export default commentsSlice.reducer;
