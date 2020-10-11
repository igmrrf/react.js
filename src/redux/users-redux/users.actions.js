import UsersActionTypes from './users.types';
import axios from '../../utils/axios';

export const clearUserMessages = () => ({
  type: UsersActionTypes.CLEAR_USER_MESSAGES,
});

const fetchUsersStart = () => ({
  type: UsersActionTypes.FETCH_USERS_START,
});

const fetchUsersSuccess = (users) => ({
  type: UsersActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (errorMessage) => ({
  type: UsersActionTypes.FETCH_USERS_FAILURE,
  payload: errorMessage,
});

export const fetchUsersStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get('users')
      .then((res) => {
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => dispatch(fetchUsersFailure(error.message)));
  };
};

const editUserStart = () => ({
  type: UsersActionTypes.EDIT_USER_START,
});

const editUserSuccess = (user) => ({
  type: UsersActionTypes.EDIT_USER_SUCCESS,
  payload: user,
});

const editUserFailure = (errorMessage) => ({
  type: UsersActionTypes.EDIT_USER_FAILURE,
  payload: errorMessage,
});

export const editUserStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editUserStart());
    axios
      .put(`users/${data.id}`, data)
      .then((res) => {
        const user = res.data;
        dispatch(editUserSuccess(user));
      })
      .catch((error) => dispatch(editUserFailure(error.message)));
  };
};

const addUserStart = () => ({
  type: UsersActionTypes.ADD_USER_START,
});

const addUserSuccess = (user) => ({
  type: UsersActionTypes.ADD_USER_SUCCESS,
  payload: user,
});

const addUserFailure = (errorMessage) => ({
  type: UsersActionTypes.ADD_USER_FAILURE,
  payload: errorMessage,
});

export const addUserStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addUserStart());
    axios
      .post(`users/`, data)
      .then((res) => {
        const user = res.data;
        dispatch(addUserSuccess(user));
      })
      .catch((error) => dispatch(addUserFailure(error.message)));
  };
};

const deleteUserStart = () => ({
  type: UsersActionTypes.DELETE_USER_START,
});

const deleteUserSuccess = (id) => ({
  type: UsersActionTypes.DELETE_USER_SUCCESS,
  payload: id,
});

const deleteUserFailure = (errorMessage) => ({
  type: UsersActionTypes.DELETE_USER_FAILURE,
  payload: errorMessage,
});

export const deleteUserStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deleteUserStart());
    axios
      .delete(`users/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deleteUserSuccess(id));
      })
      .catch((error) => dispatch(deleteUserFailure(error.message)));
  };
};
