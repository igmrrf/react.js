import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";

export const fetchTodosStartAsync = createAsyncThunk(
  "todos/fetchTodosStartAsync",
  async () => {
    const response = await axios.get("Todos");
    const todos = response.data;
    return todos;
  }
);

export const editTodoStartAsync = createAsyncThunk(
  "todos/editTodoAsync",
  async (todo) => {
    const response = await axios.put(`Todos/${todo.id}`, todo);
    const editedTodo = response.data;

    return editedTodo;
  }
);

export const addTodoStartAsync = createAsyncThunk(
  "todos/addTodoStartAsync",
  async (todo) => {
    const response = await axios.todo(`Todos/`, todo);
    const addedTodo = response.data;

    return addedTodo;
  }
);

export const deleteTodoStartAsync = createAsyncThunk(
  "todos/deleteTodoStartAsync",
  async (id) => {
    const response = await axios.delete(`Todos/${id}`);
    const deletedTodo = response.data;

    return deletedTodo;
  }
);

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodoMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchTodosStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchTodosStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(editTodoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editTodoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editTodoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addTodoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addTodoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addTodoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteTodoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteTodoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = deleteItem(state.data, action.payload);
      })
      .addCase(deleteTodoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearTodoMessage,
  fetchTodosStart,
  fetchTodosFailure,
  fetchTodosSuccess,
  editTodoStart,
  editTodoFailure,
  editTodoSuccess,
  addTodoStart,
  addTodoFailure,
  addTodoSuccess,
  deleteTodoStart,
  deleteTodoFailure,
  deleteTodoSuccess,
} = todoSlice.actions;

export const selectTodosData = (state) => state.todos.data;

export const selectTodosErrorMessage = (state) => state.todos.errorMessage;

export const selectTodosIsFetching = (state) => state.todos.isFetching;

export default todoSlice.reducer;
