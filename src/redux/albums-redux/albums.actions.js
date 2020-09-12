import AlbumsActionTypes from "./albums.types";
import axios from "../../utils/axios";

export const fetchAlbumsStart = () => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_START,
});

export const fetchAlbumsSuccess = (albums) => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_SUCCESS,
  payload: albums,
});

export const fetchAlbumsFailure = (errorMessage) => ({
  type: AlbumsActionTypes.FETCH_ALBUMS_FAILURE,
  payload: errorMessage,
});

export const fetchAlbumsStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchAlbumsStart());
    axios
      .get("albums")
      .then((res) => {
        const albums = res.data;
        dispatch(fetchAlbumsSuccess(albums));
      })
      .catch((error) => dispatch(fetchAlbumsFailure(error.message)));
  };
};

export const editAlbumStart = () => ({
  type: AlbumsActionTypes.EDIT_ALBUM_START,
});

export const editAlbumSuccess = (album) => ({
  type: AlbumsActionTypes.EDIT_ALBUM_SUCCESS,
  payload: album,
});

export const editAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.EDIT_ALBUM_FAILURE,
  payload: errorMessage,
});

export const editAlbumStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editAlbumStart());
    axios
      .put(`albums/${data.id}`, data)
      .then((res) => {
        const album = res.data;
        dispatch(editAlbumSuccess(album));
      })
      .catch((error) => dispatch(editAlbumFailure(error.message)));
  };
};
