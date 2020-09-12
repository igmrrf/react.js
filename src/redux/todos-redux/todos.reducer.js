import TodosActionTypes from "./todos.types";

const initialState = {
  isFetching: 0,
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case TodosActionTypes.FETCH_TODOS_START:
      return {
        ...state,
        isFetching: +1,
      };
    case TodosActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        isFetching: -1,
      };
    case TodosActionTypes.FETCH_TODOS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: -1,
      };
    default:
      return state;
  }
};
export default todosReducer;
