import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  pagination: {
    current_page: 1,
    total: 0,
  },
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //Set danh sách post
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.page = 1; // Reset page về 1
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
    },

    appendPosts: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updatePost: (state, action) => {
      state.posts.find((post) => {
        if (post.id === action.payload.id) {
          return (post.title = action.payload.title);
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

    addPostToList: (state, action) => {
      state.posts.unshift(action.payload);
    },
    removePostFromList: (state, action) => {
      const postId = action.payload;
      state.posts = state.posts.filter((post) => post.id !== postId);
    },
  },
});

export const {
  setPosts,
  resetPosts,
  appendPosts,

  setError,
  setHasMore,
  incrementPage,

  updatePost,
  addPostToList,
  removePostFromList,
} = postsSlice.actions;

export const { reducerPath } = postsSlice.reducerPath;

export default postsSlice.reducer;
