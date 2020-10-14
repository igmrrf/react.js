import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import albumReducer from "./albums/reducer";
import commentReducer from "./comments-redux/comments.reducer";
import photoReducer from "./photos-redux/photos.reducer";
import postReducer from "./posts-redux/posts.reducer";
import todoReducer from "./todos-redux/todos.reducer";
import userReducer from "./users-redux/users.reducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  albums: albumReducer,
  comments: commentReducer,
  photos: photoReducer,
  posts: postReducer,
  todos: todoReducer,
  users: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
