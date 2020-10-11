import UsersActionTypes from './users.types';
import {
  deleteItem,
  addNewItem,
  updateItemDetails,
} from '../redux-reducer-utils';

const initialState = {
  isFetching: false,
  users: [],
  errorMessage: null,
  message: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.CLEAR_USER_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case UsersActionTypes.DELETE_USER_START:
    case UsersActionTypes.FETCH_USERS_START:
    case UsersActionTypes.EDIT_USER_START:
    case UsersActionTypes.ADD_USER_START:
      return {
        ...state,
        isFetching: true,
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        users: action.payload,
      };

    case UsersActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        users: updateItemDetails(state.users, action.payload),
        isFetching: false,
      };

    case UsersActionTypes.ADD_USER_SUCCESS:
      return {
        ...state,
        users: addNewItem(state.users, action.payload),
        isFetching: false,
      };

    case UsersActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
        users: deleteItem(state.users, action.payload),
        isFetching: false,
      };
    case UsersActionTypes.DELETE_USER_FAILURE:
    case UsersActionTypes.FETCH_USERS_FAILURE:
    case UsersActionTypes.EDIT_USER_FAILURE:
    case UsersActionTypes.ADD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
