import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../containers/types";
import { RootState } from "../../state/store";
import axios from "../../utils/axios";

export interface IAuth {
  email: string;
  password: string;
}
export const authLoginAsync = createAsyncThunk(
  "auth/authLoginAsync",
  async (data: IAuth) => {
    const response = await axios.put(`auth/login`, data);
    const editedComment = response.data;

    return editedComment;
  }
);

interface IAuthState {
  user: null | IUser;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(authLoginAsync.pending, (state, action) => {
        console.log("pending", action);
        console.log({ state });
      })
      .addCase(authLoginAsync.fulfilled, (state, action) => {
        console.log("fulfilled", action);
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(authLoginAsync.rejected, (state, action) => {
        console.log("rejected", action);
        console.log({ state });
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
