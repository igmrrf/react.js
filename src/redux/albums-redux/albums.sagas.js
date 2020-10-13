import { takeLatest, all, call, put } from 'redux-saga/effects';
import AlbumsActionTypes from './albums.types';
import { fetchAlbumsFailure, fetchAlbumsSuccess } from './albums.actions';
import axios from '../../utils/axios';

export function* fetchAlbumsStartAsync() {
  try {
    const albums = yield axios.get('albums').then((res) => res.data);
    yield put(fetchAlbumsSuccess(albums));
  } catch (error) {
    yield put(fetchAlbumsFailure(error.message));
  }
}
export function* fetchAlbumsStartSaga() {
  yield takeLatest(AlbumsActionTypes.FETCH_ALBUMS_START, fetchAlbumsStartAsync);
}

//Not neccessary unless you have more than one sagas exports
//The array should contain a list of actions to be listened to

export function* albumsSaga() {
  yield all([call(fetchAlbumsStartSaga)]);
}
