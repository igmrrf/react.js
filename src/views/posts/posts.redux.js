import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import {
  addNewItem,
  deleteItem,
  updateItem,
} from "../../utils/modifier";

// Thunks
export const fetchPostsStartAsync = createAsyncThunk(
  "posts/fetchPostsStartAsync",
  async () => {
    const response = await axios.get("Posts");
    const posts = response.data;
    return posts;
  }
);

export const editPostStartAsync = createAsyncThunk(
  "posts/editPostAsync",
  async (post) => {
    const response = await axios.put(`Posts/${post.id}`, post);
    const editedPost = response.data;

    return editedPost;
  }
);

export const addPostStartAsync = createAsyncThunk(
  "posts/addPostStartAsync",
  async (post) => {
    const response = await axios.post(`Posts/`, post);
    const addedPost = response.data;

    return addedPost;
  }
);

export const deletePostStartAsync = createAsyncThunk(
  "posts/deletePostStartAsync",
  async (id) => {
    const response = await axios.delete(`Posts/${id}`);
    const deletedPost = response.data;

    return deletedPost;
  }
);

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPostsStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchPostsStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(editPostStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editPostStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editPostStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addPostStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addPostStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addPostStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deletePostStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deletePostStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = deleteItem(state.data, action.payload);
      })
      .addCase(deletePostStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearPostMessage,
  fetchPostsStart,
  fetchPostsFailure,
  fetchPostsSuccess,
  editPostStart,
  editPostFailure,
  editPostSuccess,
  addPostStart,
  addPostFailure,
  addPostSuccess,
  deletePostStart,
  deletePostFailure,
  deletePostSuccess,
} = postSlice.actions;

export const selectPostsData = (state) => state.posts.data;

export const selectPostsErrorMessage = (state) => state.posts.errorMessage;

export const selectPostsIsFetching = (state) => state.posts.isFetching;

export default postSlice.reducer;
