import {
  combineReducers,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { getWithExpiry } from "funckage/lib/store";
import {
  getFirebase,
  actionTypes as rrfActionTypes,
} from "react-redux-firebase";
import { constants as rfConstants } from "redux-firestore";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { APISlice } from "../utils/axios";
import { graphQLApi } from "../utils/graphql";
import logger from "../utils/logger";
import albumsReducer from "../views/albums/albums.redux";
import authReducer from "../views/auth/auth.redux";
import commentsReducer from "../views/comments/comments.redux";
import photosReducer from "../views/photos/photos.redux";
import postsReducer from "../views/posts/posts.redux";
import todosReducer from "../views/todos/todos.redux";
import usersReducer from "../views/users/users.redux";

const rootReducer = combineReducers({
  albums: albumsReducer,
  comments: commentsReducer,
  photos: photosReducer,
  posts: postsReducer,
  todos: todosReducer,
  users: usersReducer,
  auth: authReducer,
  [APISlice.reducerPath]: APISlice.reducer,
  [graphQLApi.reducerPath]: graphQLApi.reducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [APISlice.reducerPath, graphQLApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const getJWT = (): string | null => {
  const jwt = getWithExpiry("jwt");
  if (jwt === null) {
    console.log("No Authentication");
  }
  return jwt;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          ...Object.keys(rfConstants.actionTypes).map(
            (type) => `${rfConstants.actionsPrefix}/${type}`,
          ),
          ...Object.keys(rrfActionTypes).map(
            (type) => `@@reactReduxFirebase/${type}`,
          ),
        ],
        ignoredPaths: ["firebase", "firestore"],
      },
      thunk: { extraArgument: { jwt: getJWT(), getFirebase } },
    }).concat([logger, APISlice.middleware, graphQLApi.middleware]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: Error400s;
  extra: { jwt: string; s: string; n: number };
}>();

export interface Error400s {
  errorMessage: string;
}
