import UsersActionTypes from "./users.types";
import axios from "../../utils/axios";

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

export const fetchUsersAsyncStart = () => {
  return (dispatch) => {
    dispatch(fetchUsersStart());
    axios
      .get("users")
      .then((res) => {
        const users = res.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => dispatch(fetchUsersFailure(err.message)));
  };
};
