import PostsActionTypes from './posts.types';
import {
  updateItemDetails,
  addNewItem,
  deleteItem,
} from '../redux-reducer-utils';

const initialState = {
  isFetching: false,
  posts: [],
  errorMessage: '',
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case PostsActionTypes.CLEAR_POST_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case PostsActionTypes.FETCH_POSTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostsActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    case PostsActionTypes.FETCH_POSTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PostsActionTypes.EDIT_POST_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostsActionTypes.EDIT_POST_SUCCESS:
      return {
        ...state,
        posts: updateItemDetails(state.posts, action.payload),
        isFetching: false,
      };
    case PostsActionTypes.EDIT_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PostsActionTypes.ADD_POST_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostsActionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        posts: addNewItem(state.posts, action.payload),
        isFetching: false,
      };
    case PostsActionTypes.ADD_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case PostsActionTypes.DELETE_POST_START:
      return {
        ...state,
        isFetching: true,
      };
    case PostsActionTypes.DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: deleteItem(state.posts, action.payload),
        isFetching: false,
      };
    case PostsActionTypes.DELETE_POST_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
