import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IPost } from "../../containers/types";
import { RootState } from "../../store";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";
import { IInitialState } from "../types";

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
  async (post: IPost) => {
    const response = await axios.put(`Posts/${post.id}`, post);
    const editedPost = response.data;

    return editedPost;
  }
);

export const addPostStartAsync = createAsyncThunk(
  "posts/addPostStartAsync",
  async (post: IPost) => {
    const response = await axios.post(`Posts/`, post);
    const addedPost = response.data;

    return addedPost;
  }
);

export const deletePostStartAsync = createAsyncThunk(
  "posts/deletePostStartAsync",
  async (post: IPost) => {
    const response = await axios.delete(`posts/${post.id}`);

    const deletedPost = { ...post, ...response.data };

    return deletedPost;
  }
);

const initialState: IInitialState = {
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
        state.data = deleteItem(state.data, action.payload);
      })
      .addCase(deletePostStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearPostMessage,
  // fetchPostsStart,
  // fetchPostsFailure,
  // fetchPostsSuccess,
  // editPostStart,
  // editPostFailure,
  // editPostSuccess,
  // addPostStart,
  // addPostFailure,
  // addPostSuccess,
  // deletePostStart,
  // deletePostFailure,
  // deletePostSuccess,
} = postSlice.actions;

export const selectPostsData = (state: RootState) => state.posts.data;

export const selectPostsErrorMessage = (state: RootState) =>
  state.posts.errorMessage;

export const selectPostsIsFetching = (state: RootState) =>
  state.posts.isFetching;

export default postSlice.reducer;
