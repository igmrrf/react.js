import { all, call } from "redux-saga/effects";
import albumsSaga from "./albums/sagas";
// import { commentsSaga } from './comments-redux/comments.sagas';
// import { photosSaga } from './photos-redux/photos.sagas';
// import { postsSaga } from './posts-redux/posts.sagas';
// import { todosSaga } from './todos-redux/todos.sagas';
// import { usersSaga } from './users-redux/users.sagas';

export default function* rootSaga() {
  yield all([
    call(albumsSaga),
    // call(commentsSaga),
    // call(photosSaga),
    // call(postsSaga),
    // call(todosSaga),
    // call(usersSaga),
  ]);
}
