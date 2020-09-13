import PostsActionTypes from "./posts.types";
import axios from "../../utils/axios";

export const fetchPostsStart = () => ({
  type: PostsActionTypes.FETCH_POSTS_START,
});

export const fetchPostsSuccess = (posts) => ({
  type: PostsActionTypes.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (errorMessage) => ({
  type: PostsActionTypes.FETCH_POSTS_FAILURE,
  payload: errorMessage,
});

export const fetchPostsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    axios
      .get("posts")
      .then((res) => {
        const posts = res.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((error) => dispatch(fetchPostsFailure(error.message)));
  };
};

export const editPostStart = () => ({
  type: PostsActionTypes.EDIT_POST_START,
});

export const editPostSuccess = (post) => ({
  type: PostsActionTypes.EDIT_POST_SUCCESS,
  payload: post,
});

export const editPostFailure = (errorMessage) => ({
  type: PostsActionTypes.EDIT_POST_FAILURE,
  payload: errorMessage,
});

export const editPostStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editPostStart());
    axios
      .put(`posts/${data.id}`, data)
      .then((res) => {
        const post = res.data;
        dispatch(editPostSuccess(post));
      })
      .catch((error) => dispatch(editPostFailure(error.message)));
  };
};

export const addPostStart = () => ({
  type: PostsActionTypes.ADD_POST_START,
});

export const addPostSuccess = (post) => ({
  type: PostsActionTypes.ADD_POST_SUCCESS,
  payload: post,
});

export const addPostFailure = (errorMessage) => ({
  type: PostsActionTypes.ADD_POST_FAILURE,
  payload: errorMessage,
});

export const addPostStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addPostStart());
    axios
      .post(`posts/`, data)
      .then((res) => {
        const post = res.data;
        dispatch(addPostSuccess(post));
      })
      .catch((error) => dispatch(addPostFailure(error.message)));
  };
};

export const deletePostStart = () => ({
  type: PostsActionTypes.DELETE_POST_START,
});

export const deletePostSuccess = (id) => ({
  type: PostsActionTypes.DELETE_POST_SUCCESS,
  payload: id,
});

export const deletePostFailure = (errorMessage) => ({
  type: PostsActionTypes.DELETE_POST_FAILURE,
  payload: errorMessage,
});

export const deletePostStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deletePostStart());
    axios
      .delete(`posts/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deletePostSuccess(id));
      })
      .catch((error) => dispatch(deletePostFailure(error.message)));
  };
};
