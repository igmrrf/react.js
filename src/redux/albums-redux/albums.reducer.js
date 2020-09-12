import AlbumsActionTypes from "./albums.types";
import { updateAlbumDetails } from "./album.utils";

const initialState = {
  isFetching: 0,
  albums: [],
};

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case AlbumsActionTypes.FETCH_ALBUMS_START:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_SUCCESS:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        albums: action.payload,
      };
    case AlbumsActionTypes.FETCH_ALBUMS_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        errorMessage: action.payload,
      };
    case AlbumsActionTypes.EDIT_ALBUM_START:
      return {
        ...state,
        isFetching: state.isFetching + 1,
      };
    case AlbumsActionTypes.EDIT_ALBUM_SUCCESS:
      return {
        ...state,
        albums: updateAlbumDetails(state.albums, action.payload),
        isFetching: state.isFetching - 1,
      };
    case AlbumsActionTypes.EDIT_ALBUM_FAILURE:
      return {
        ...state,
        isFetching: state.isFetching - 1,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default albumReducer;
