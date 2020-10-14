import { takeLatest, call, all, put, fork } from 'redux-saga/effects';
import CommentsActionTypes from './comments.types';
import {
  fetchCommentsFailure,
  fetchCommentsSuccess,
  clearCommentMessages,
} from './comments.actions';
import axios from '../../utils/axios';

export function* fetchCommentsStartAsync() {
  try {
    const comments = yield call(axios.get('comments').then((res) => res.data));
    yield put(fetchCommentsSuccess(comments));
  } catch (error) {
    yield put(fetchCommentsFailure(error.message));
  }
}

export function* fetchCommentStart() {
  yield takeLatest(
    CommentsActionTypes.FETCH_COMMENTS_START,
    fetchCommentsStartAsync()
  );
}

export function* clearCommentMessagesStart() {
  yield put(clearCommentMessages());
}

export function* clearCommentMessagesSaga() {
  yield takeLatest(
    [
      CommentsActionTypes.FETCH_COMMENTS_SUCCESS,
      CommentsActionTypes.FETCH_COMMENTS_FAILURE,
      CommentsActionTypes.DELETE_COMMENT_SUCCESS,
      CommentsActionTypes.DELETE_COMMENT_FAILURE,
      CommentsActionTypes.ADD_COMMENT_SUCCESS,
      CommentsActionTypes.ADD_COMMENT_FAILURE,
      CommentsActionTypes.EDIT_COMMENT_SUCCESS,
      CommentsActionTypes.EDIT_COMMENT_FAILURE,
    ],
    clearCommentMessagesStart
  );
}

//Export an array of all saga listeners on Comments
export function* commentsSaga() {
  yield all([fork(fetchCommentStart), fork(clearCommentMessagesSaga)]);
}
