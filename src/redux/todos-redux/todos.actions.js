import TodosActionTypes from "./todos.types";
import axios from "../../utils/axios";

const fetchTodosStart = () => ({
  type: TodosActionTypes.FETCH_todos_START,
});

const fetchTodosSuccess = (todos) => ({
  type: TodosActionTypes.FETCH_todos_SUCCESS,
  payload: todos,
});

const fetchTodosFailure = (errorMessage) => ({
  type: TodosActionTypes.FETCH_todos_FAILURE,
  payload: errorMessage,
});

export const fetchTodosAsyncStart = () => {
  return (dispatch) => {
    dispatch(fetchTodosStart());
    axios
      .get("todos")
      .then((res) => {
        const todos = res.data;
        dispatch(fetchTodosSuccess(todos));
      })
      .catch((err) => dispatch(fetchTodosFailure(err.message)));
  };
};
