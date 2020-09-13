import AlbumsActionTypes from "./albums.types";
import {
  updateItemDetails,
  deleteItem,
  addNewItem,
} from "../redux-reducer-utils";

const initialState = {
  isFetching: false,
  albums: [],
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case AlbumsActionTypes.FETCH_ALBUMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        albums: action.payload,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.EDIT_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.EDIT_ALBUM_SUCCESS:
      return {
        ...state,
        albums: updateItemDetails(state.albums, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.EDIT_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.ADD_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.ADD_ALBUM_SUCCESS:
      return {
        ...state,
        albums: addNewItem(state.albums, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.ADD_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.DELETE_ALBUM_START:
      return {
        ...state,
        isFetching: true,
      };
    case AlbumsActionTypes.DELETE_ALBUM_SUCCESS:
      return {
        ...state,
        albums: deleteItem(state.albums, action.payload),
        isFetching: false,
      };
    case AlbumsActionTypes.DELETE_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default albumReducer;
