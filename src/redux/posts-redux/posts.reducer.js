import PostsActionTypes from "./posts.types";

const initialState = {
  isFetching: 0,
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: +1,
      };
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        isFetching: -1,
      };
    case PostsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: -1,
      };
    default:
      return state;
  }
};
export default postsReducer;
