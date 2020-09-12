import { combineReducers } from "redux";
import albumReducer from "./albums-redux/albums.reducer";
import commentReducer from "./comments-redux/comments.reducer";
import photoReducer from "./photos-redux/photos.reducer";
import postReducer from "./posts-redux/posts.reducer";
import todoReducer from "./todos-redux/todos.reducer";
import userReducer from "./users-redux/users.reducer";

const rootReducer = combineReducers({
  albums: albumReducer,
  comments: commentReducer,
  photos: photoReducer,
  posts: postReducer,
  todos: todoReducer,
  users: userReducer,
});

export default rootReducer;
