import CommentsActionTypes from './comments.types';
import axios from '../../utils/axios';

export const clearCommentMessages = () => ({
  type: CommentsActionTypes.CLEAR_COMMENT_MESSAGES,
});
const fetchCommentsStart = () => ({
  type: CommentsActionTypes.FETCH_COMMENTS_START,
});

const fetchCommentsSuccess = (comments) => ({
  type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

const fetchCommentsFailure = (errorMessage) => ({
  type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
  payload: errorMessage,
});

export const fetchCommentsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCommentsStart());
    axios
      .get('comments')
      .then((res) => {
        const comments = res.data;
        dispatch(fetchCommentsSuccess(comments));
      })
      .catch((error) => dispatch(fetchCommentsFailure(error.message)));
  };
};

const editCommentStart = () => ({
  type: CommentsActionTypes.EDIT_COMMENT_START,
});

const editCommentSuccess = (comment) => ({
  type: CommentsActionTypes.EDIT_COMMENT_SUCCESS,
  payload: comment,
});

const editCommentFailure = (errorMessage) => ({
  type: CommentsActionTypes.EDIT_COMMENT_FAILURE,
  payload: errorMessage,
});

export const editCommentStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editCommentStart());
    axios
      .put(`comments/${data.id}`, data)
      .then((res) => {
        const comment = res.data;
        dispatch(editCommentSuccess(comment));
      })
      .catch((error) => dispatch(editCommentFailure(error.message)));
  };
};

const addCommentStart = () => ({
  type: CommentsActionTypes.ADD_COMMENT_START,
});

const addCommentSuccess = (comment) => ({
  type: CommentsActionTypes.ADD_COMMENT_SUCCESS,
  payload: comment,
});

const addCommentFailure = (errorMessage) => ({
  type: CommentsActionTypes.ADD_COMMENT_FAILURE,
  payload: errorMessage,
});

export const addCommentStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addCommentStart());
    axios
      .post(`comments/`, data)
      .then((res) => {
        const comment = res.data;
        dispatch(addCommentSuccess(comment));
      })
      .catch((error) => dispatch(addCommentFailure(error.message)));
  };
};

const deleteCommentStart = () => ({
  type: CommentsActionTypes.DELETE_COMMENT_START,
});

const deleteCommentSuccess = (id) => ({
  type: CommentsActionTypes.DELETE_COMMENT_SUCCESS,
  payload: id,
});

const deleteCommentFailure = (errorMessage) => ({
  type: CommentsActionTypes.DELETE_COMMENT_FAILURE,
  payload: errorMessage,
});

export const deleteCommentStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deleteCommentStart());
    axios
      .delete(`comments/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deleteCommentSuccess(id));
      })
      .catch((error) => dispatch(deleteCommentFailure(error.message)));
  };
};
