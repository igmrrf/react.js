import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUser } from "../../containers/types";
import { RootState } from "../../store";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";
import { IInitialState } from "../types";

export const fetchUsersStartAsync = createAsyncThunk(
  "users/fetchUsersStartAsync",
  async () => {
    const response = await axios.get("Users");
    const users = response.data;
    return users;
  }
);

export const editUserStartAsync = createAsyncThunk(
  "users/editUserAsync",
  async (user: IUser) => {
    const response = await axios.put(`Users/${user.id}`, user);
    const editedUser = response.data;

    return editedUser;
  }
);

export const addUserStartAsync = createAsyncThunk(
  "users/addUserStartAsync",
  async (user: IUser) => {
    const response = await axios.post(`Users/`, user);
    const addedUser = response.data;

    return addedUser;
  }
);

export const deleteUserStartAsync = createAsyncThunk(
  "users/deleteUserStartAsync",
  async (user: IUser) => {
    const response = await axios.delete(`Users/${user.id}`);
    const deletedUser = { ...user, ...response.data };

    return deletedUser;
  }
);

const initialState: IInitialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUsersStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchUsersStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(editUserStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editUserStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editUserStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addUserStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addUserStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addUserStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteUserStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteUserStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = deleteItem(state.data, action.payload);
      })
      .addCase(deleteUserStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearUserMessage,
  // fetchUsersStart,
  // fetchUsersFailure,
  // fetchUsersSuccess,
  // editUserStart,
  // editUserFailure,
  // editUserSuccess,
  // addUserStart,
  // addUserFailure,
  // addUserSuccess,
  // deleteUserStart,
  // deleteUserFailure,
  // deleteUserSuccess,
} = userSlice.actions;

export const selectUsersData = (state: RootState) => state.users.data;

export const selectUsersErrorMessage = (state: RootState) =>
  state.users.errorMessage;

export const selectUsersIsFetching = (state: RootState) =>
  state.users.isFetching;

export default userSlice.reducer;
