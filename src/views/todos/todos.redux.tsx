import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";

import { ITodo } from "../../containers/types";
import { IGenericState, createGenericSlice } from "../../state";
import { AppDispatch, RootState } from "../../store";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";

export const fetchTodosStartAsync = createAsyncThunk(
  "todos/fetchTodosStartAsync",
  async () => {
    const response = await axios.get("Todos");
    console.log({ response });
    const todos = response.data;
    return todos;
  }
);

interface Error400s {
  errorMessage: string;
}

type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state: RootState;
  /** type for `thunkApi.dispatch` */
  dispatch: AppDispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra: { jwt: string };
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: Error400s;
  /** return type of the `serializeError` option callback */
  // serializedErrorType?: unknown;
  // /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  // pendingMeta?: unknown;
  // /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  // fulfilledMeta?: unknown;
  // /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  // rejectedMeta?: unknown;
};

export const editTodoStartAsync = createAsyncThunk<
  any,
  any,
  AsyncThunkConfig
>("todos/editTodoAsync", async (todo: ITodo, thunkApi) => {
  const response = await axios.put(`Todos/${todo.id}`, todo, {
    headers: { Authorization: `Bearer ${thunkApi.extra.jwt}` },
  });
  if (response.status === 400) {
    return thunkApi.rejectWithValue(response.data);
  }
  const editedTodo = response.data;

  return editedTodo as ITodo;
});



export const addTodoStartAsync = createAsyncThunk(
  "todos/addTodoStartAsync",
  async (todo: ITodo) => {
    const response = await axios.post(`Todos/`, todo);
    const addedTodo = response.data;
    return { ...addedTodo } as ITodo;
  }
);

export const deleteTodoStartAsync = createAsyncThunk(
  "todos/deleteTodoStartAsync",
  async (todo: ITodo) => {
    const response = await axios.delete(`Todos/${todo.id}`);
    const deletedTodo: ITodo = { ...todo, ...response.data };
    return deletedTodo;
  }
);

const todoSlice = createGenericSlice({
  name: "todo",
  extraReducers: (builder: ActionReducerMapBuilder<IGenericState>) => {
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
        // BASICALLY WHENEVER AN ASYNC FAILS, THE MESSAGE IS SET AS THE PAYLOAD
        // WHICH IS WRONG, AN ERROR (rejectValue) CAN BE SET ON createAsyncThunk
        if (action.payload) {
          state.errorMessage = action.payload.errorMessage;
        } else {
          state.status = "error";
        }
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
        state.data = deleteItem(state.data, action.payload);
      })
      .addCase(deleteTodoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { clearMessage: clearTodoMessage } = todoSlice.actions;

export const selectTodosData = (state: RootState) => state.todos.data;

export const selectTodosErrorMessage = (state: RootState) =>
  state.todos.errorMessage;

export const selectTodosIsFetching = (state: RootState) =>
  state.todos.isFetching;

export default todoSlice.reducer;

// // Redux with Reducer and Actions
// type ActPay = { index: number; completed: boolean };
// const initialS: ActPay[] = [];
// const addTodo = createAction<ActPay, "ADD_TODO">("ADD_TODO");
// const toggleTodo = createAction<ActPay, "TOGGLE_TODO">("TOGGLE_TODO");
// const deleteTodo = createAction<ActPay, "DELETE_TODO">("DELETE_TODO");

// const dispatch = useDispatch();
// dispatch(addTodo({ index: 0, completed: false }));

// const todosReducer = createReducer(initialS, (builder) => {
//   builder
//     .addCase(addTodo, (state, action: PayloadAction<ActPay, any>) => {
//       state.push(action.payload);
//     })
//     .addCase(toggleTodo, (state, action: PayloadAction<ActPay, any>) => {
//       const todo = state[action.payload.index];
//       todo.completed = !todo.completed;
//     })
//     .addCase(deleteTodo, (state, action: PayloadAction<ActPay, any>) => {
//       return state.filter((todo, i) => i !== action.payload.index);
//     });
// });

// Adding Meta Data
// const blogSlice = createSlice({
//   name: "blogData",
//   initialState,
//   reducers: {
//     receivedAll: {
//       reducer(
//         state,
//         action: PayloadAction<Page[], string, { currentPage: number }>
//       ) {
//         state.all = action.payload;
//         state.meta = action.meta;
//       },
//       prepare(payload: Page[], currentPage: number) {
//         return { payload, meta: { currentPage } };
//       },
//     },
//   },
// });
