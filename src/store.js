import { configureStore } from "@reduxjs/toolkit";
import logger from "./utils/logger";
import albumsReducer from "./views/albums/albums.redux";
import commentsReducer from "./views/comments/comments.redux";
import photosReducer from "./views/photos/photos.redux";
import postsReducer from "./views/posts/posts.redux";
import todosReducer from "./views/todos/todos.redux";
import usersReducer from "./views/users/users.redux";

export const store = configureStore({
  reducer: {
    albums: albumsReducer,
    comments: commentsReducer,
    photos: photosReducer,
    posts: postsReducer,
    todos: todosReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
