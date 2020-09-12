import CommentsActionTypes from "./comments.types";

const initialState = {
  isFetching: 0,
  comments: [],
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CommentsActionTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: -1,
        comments: action.payload,
      };
    case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: -1,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
