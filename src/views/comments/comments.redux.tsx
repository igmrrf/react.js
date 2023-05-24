import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IComment } from "../../containers/types";
import { RootState } from "../../store";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";
import { IInitialState } from "../types";

export const fetchCommentsStartAsync = createAsyncThunk(
  "comments/fetchCommentsStartAsync",
  async () => {
    const response = await axios.get("Comments");
    const comments = response.data;
    return comments;
  }
);

export const editCommentStartAsync = createAsyncThunk(
  "comments/editCommentAsync",
  async (comment: IComment) => {
    const response = await axios.put(`Comments/${comment.id}`, comment);
    const editedComment = response.data;

    return editedComment;
  }
);

export const addCommentStartAsync = createAsyncThunk(
  "comments/addCommentStartAsync",
  async (comment: IComment) => {
    const response = await axios.post(`Comments/`, comment);
    const addedComment = response.data;

    return addedComment;
  }
);

export const deleteCommentStartAsync = createAsyncThunk(
  "comments/deleteCommentStartAsync",
  async (comment: IComment) => {
    const response = await axios.delete(`Comments/${comment.id}`);
    const deletedComment = { ...comment, ...response.data };

    return deletedComment;
  }
);

const initialState: IInitialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchCommentsStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchCommentsStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload || action.error.message;
      });

    builder
      .addCase(editCommentStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editCommentStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editCommentStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addCommentStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addCommentStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addCommentStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteCommentStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteCommentStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = deleteItem(state.data, action.payload);
      })
      .addCase(deleteCommentStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearCommentMessage,
  // fetchCommentsStart,
  // fetchCommentsFailure,
  // fetchCommentsSuccess,
  // editCommentStart,
  // editCommentFailure,
  // editCommentSuccess,
  // addCommentStart,
  // addCommentFailure,
  // addCommentSuccess,
  // deleteCommentStart,
  // deleteCommentFailure,
  // deleteCommentSuccess,
} = commentSlice.actions;

export const selectCommentsData = (state: RootState) => state.comments.data;

export const selectCommentsErrorMessage = (state: RootState) =>
  state.comments.errorMessage;

export const selectCommentsIsFetching = (state: RootState) =>
  state.comments.isFetching;

export default commentSlice.reducer;
