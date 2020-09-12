import PostsActionTypes from "./posts.types";
import axios from "../../utils/axios";

const fetchPostsStart = () => ({
  type: PostsActionTypes.FETCH_posts_START,
});

const fetchPostsSuccess = (posts) => ({
  type: PostsActionTypes.FETCH_posts_SUCCESS,
  payload: posts,
});

const fetchPostsFailure = (errorMessage) => ({
  type: PostsActionTypes.FETCH_posts_FAILURE,
  payload: errorMessage,
});

export const fetchPostsAsyncStart = () => {
  return (dispatch) => {
    dispatch(fetchPostsStart());
    axios
      .get("posts")
      .then((res) => {
        const posts = res.data;
        dispatch(fetchPostsSuccess(posts));
      })
      .catch((err) => dispatch(fetchPostsFailure(err.message)));
  };
};
