import UsersActionTypes from "./users.types";

const initialState = {
  isFetching: 0,
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_START:
      return {
        ...state,
        isFetching: +1,
      };
    case UsersActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isFetching: -1,
      };
    case UsersActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: -1,
      };
    default:
      return state;
  }
};
export default usersReducer;
