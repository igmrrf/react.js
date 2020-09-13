import todosActionTypes from "./todos.types";
import axios from "../../utils/axios";

export const fetchTodosStart = () => ({
  type: todosActionTypes.FETCH_TODOS_START,
});

export const fetchTodosSuccess = (todos) => ({
  type: todosActionTypes.FETCH_TODOS_SUCCESS,
  payload: todos,
});

export const fetchTodosFailure = (errorMessage) => ({
  type: todosActionTypes.FETCH_TODOS_FAILURE,
  payload: errorMessage,
});

export const fetchTodosStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchTodosStart());
    axios
      .get("todos")
      .then((res) => {
        const todos = res.data;
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((error) => dispatch(fetchTodosFailure(error.message)));
  };
};

export const editTodoStart = () => ({
  type: todosActionTypes.EDIT_TODO_START,
});

export const editTodoSuccess = (todo) => ({
  type: todosActionTypes.EDIT_TODO_SUCCESS,
  payload: todo,
});

export const editTodoFailure = (errorMessage) => ({
  type: todosActionTypes.EDIT_TODO_FAILURE,
  payload: errorMessage,
});

export const editTodoStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editTodoStart());
    axios
      .put(`todos/${data.id}`, data)
      .then((res) => {
        const todo = res.data;
        dispatch(editTodoSuccess(todo));
      })
      .catch((error) => dispatch(editTodoFailure(error.message)));
  };
};

export const addTodoStart = () => ({
  type: todosActionTypes.ADD_TODO_START,
});

export const addTodoSuccess = (todo) => ({
  type: todosActionTypes.ADD_TODO_SUCCESS,
  payload: todo,
});

export const addTodoFailure = (errorMessage) => ({
  type: todosActionTypes.ADD_TODO_FAILURE,
  payload: errorMessage,
});

export const addTodoStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addTodoStart());
    axios
      .post(`todos/`, data)
      .then((res) => {
        const todo = res.data;
        dispatch(addTodoSuccess(todo));
      })
      .catch((error) => dispatch(addTodoFailure(error.message)));
  };
};

export const deleteTodoStart = () => ({
  type: todosActionTypes.DELETE_TODO_START,
});

export const deleteTodoSuccess = (id) => ({
  type: todosActionTypes.DELETE_TODO_SUCCESS,
  payload: id,
});

export const deleteTodoFailure = (errorMessage) => ({
  type: todosActionTypes.DELETE_TODO_FAILURE,
  payload: errorMessage,
});

export const deleteTodoStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deleteTodoStart());
    axios
      .delete(`todos/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deleteTodoSuccess(id));
      })
      .catch((error) => dispatch(deleteTodoFailure(error.message)));
  };
};
