import { takeLatest, all, call, put } from "redux-saga/effects";
import AlbumsActionTypes from "./types";
import {
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
  clearAlbumMessages,
} from "./actions";
import axios from "../../utils/axios";

export function* fetchAlbumsStartAsync() {
  try {
    const albums = yield call(axios.get("albums").then((res) => res.data));
    yield put(fetchAlbumsSuccess(albums));
  } catch (error) {
    yield put(fetchAlbumsFailure(error.message));
  }
}
export function* fetchAlbumsStartSaga() {
  yield takeLatest(AlbumsActionTypes.FETCH_ALBUMS_START, fetchAlbumsStartAsync);
}

export function* clearAlbumMessagesStart() {
  yield put(clearAlbumMessages());
}

export function* clearAlbumMessagesSaga() {
  yield takeLatest(
    [
      AlbumsActionTypes.DELETE_ALBUM_FAILURE,
      AlbumsActionTypes.DELETE_ALBUM_SUCCESS,
      AlbumsActionTypes.ADD_ALBUM_FAILURE,
      AlbumsActionTypes.ADD_ALBUM_SUCCESS,
      AlbumsActionTypes.EDIT_ALBUM_FAILURE,
      AlbumsActionTypes.EDIT_ALBUM_SUCCESS,
      AlbumsActionTypes.FETCH_ALBUMS_FAILURE,
      AlbumsActionTypes.FETCH_ALBUMS_SUCCESS,
    ],
    clearAlbumMessagesStart
  );
}

//Not neccessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export default function* albumsSaga() {
  yield all([call(fetchAlbumsStartSaga), call(clearAlbumMessagesSaga)]);
}
