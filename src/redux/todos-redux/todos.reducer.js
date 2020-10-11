import TodosActionTypes from './todos.types';
import {
  updateItemDetails,
  addNewItem,
  deleteItem,
} from '../redux-reducer-utils';

const initialState = {
  isFetching: false,
  todos: [],
  errorMessage: '',
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TodosActionTypes.CLEAR_TODO_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case TodosActionTypes.FETCH_TODOS_START:
      return {
        ...state,
        isFetching: true,
      };
    case TodosActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        todos: action.payload,
      };
    case TodosActionTypes.FETCH_TODOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case TodosActionTypes.EDIT_TODO_START:
      return {
        ...state,
        isFetching: true,
      };
    case TodosActionTypes.EDIT_TODO_SUCCESS:
      return {
        ...state,
        todos: updateItemDetails(state.todos, action.payload),
        isFetching: false,
      };
    case TodosActionTypes.EDIT_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case TodosActionTypes.ADD_TODO_START:
      return {
        ...state,
        isFetching: true,
      };
    case TodosActionTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: addNewItem(state.todos, action.payload),
        isFetching: false,
      };
    case TodosActionTypes.ADD_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case TodosActionTypes.DELETE_TODO_START:
      return {
        ...state,
        isFetching: true,
      };
    case TodosActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: deleteItem(state.todos, action.payload),
        isFetching: false,
      };
    case TodosActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
