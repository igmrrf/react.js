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

export const addAlbumStart = () => ({
  type: AlbumsActionTypes.ADD_ALBUM_START,
});

export const addAlbumSuccess = (album) => ({
  type: AlbumsActionTypes.ADD_ALBUM_SUCCESS,
  payload: album,
});

export const addAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.ADD_ALBUM_FAILURE,
  payload: errorMessage,
});

export const addAlbumStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addAlbumStart());
    axios
      .post(`albums/`, data)
      .then((res) => {
        const album = res.data;
        dispatch(addAlbumSuccess(album));
      })
      .catch((error) => dispatch(addAlbumFailure(error.message)));
  };
};

export const deleteAlbumStart = () => ({
  type: AlbumsActionTypes.DELETE_ALBUM_START,
});

export const deleteAlbumSuccess = (id) => ({
  type: AlbumsActionTypes.DELETE_ALBUM_SUCCESS,
  payload: id,
});

export const deleteAlbumFailure = (errorMessage) => ({
  type: AlbumsActionTypes.DELETE_ALBUM_FAILURE,
  payload: errorMessage,
});

export const deleteAlbumStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deleteAlbumStart());
    axios
      .delete(`albums/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deleteAlbumSuccess(id));
      })
      .catch((error) => dispatch(deleteAlbumFailure(error.message)));
  };
};
