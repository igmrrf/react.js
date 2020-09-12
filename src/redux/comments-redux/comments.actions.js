import CommentsActionTypes from "./comments.types";
import axios from "../../utils/axios";

export const fetchCommentsStart = () => ({
  type: CommentsActionTypes.FETCH_COMMENTS_START,
});

export const fetchCommentsSuccess = (comments) => ({
  type: CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const fetchCommentsFailure = (errorMessage) => ({
  type: CommentsActionTypes.FETCH_COMMENTS_FAILURE,
  payload: errorMessage,
});

export const fetchCommentsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchCommentsStart());
    axios
      .get("comments")
      .then((res) => {
        const comments = res.data;
        dispatch(fetchCommentsSuccess(comments));
      })
      .catch((error) => dispatch(fetchCommentsFailure(error.message)));
  };
};
