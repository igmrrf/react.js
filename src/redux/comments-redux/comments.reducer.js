import CommentsActionTypes from './comments.types';
import {
  updateItemDetails,
  deleteItem,
  addNewItem,
} from '../redux-reducer-utils';

const initialState = {
  isFetching: false,
  comments: [],
  errorMessage: '',
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CommentsActionTypes.CLEAR_COMMENT_MESSAGES:
      return {
        ...state,
        errorMessage: null,
        message: null,
      };
    case CommentsActionTypes.FETCH_COMMENTS_START:
      return {
        ...state,
        isFetching: true,
      };
    case CommentsActionTypes.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
      };
    case CommentsActionTypes.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case CommentsActionTypes.EDIT_COMMENT_START:
      return {
        ...state,
        isFetching: true,
      };
    case CommentsActionTypes.EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comments: updateItemDetails(state.comments, action.payload),
        isFetching: false,
      };
    case CommentsActionTypes.EDIT_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case CommentsActionTypes.ADD_COMMENT_START:
      return {
        ...state,
        isFetching: true,
      };
    case CommentsActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: addNewItem(state.comments, action.payload),
        isFetching: false,
      };
    case CommentsActionTypes.ADD_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case CommentsActionTypes.DELETE_COMMENT_START:
      return {
        ...state,
        isFetching: true,
      };
    case CommentsActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: deleteItem(state.comments, action.payload),
        isFetching: false,
      };
    case CommentsActionTypes.DELETE_COMMENT_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default commentReducer;
