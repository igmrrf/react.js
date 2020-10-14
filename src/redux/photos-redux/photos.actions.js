import PhotosActionTypes from "./photos.types";
import axios from "../../utils/axios";

export const clearPhotoMessages = () => ({
  type: PhotosActionTypes.CLEAR_PHOTO_MESSAGES,
});
export const fetchPhotosStart = () => ({
  type: PhotosActionTypes.FETCH_PHOTOS_START,
});

export const fetchPhotosSuccess = (photos) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

export const fetchPhotosFailure = (errorMessage) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_FAILURE,
  payload: errorMessage,
});

export const fetchPhotosStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchPhotosStart());
    axios
      .get("photos")
      .then((res) => {
        const photos = res.data;
        dispatch(fetchPhotosSuccess(photos));
      })
      .catch((error) => dispatch(fetchPhotosFailure(error.message)));
  };
};

export const editPhotoStart = () => ({
  type: PhotosActionTypes.EDIT_PHOTO_START,
});

export const editPhotoSuccess = (photo) => ({
  type: PhotosActionTypes.EDIT_PHOTO_SUCCESS,
  payload: photo,
});

export const editPhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.EDIT_PHOTO_FAILURE,
  payload: errorMessage,
});

export const editPhotoStartAsync = (data) => {
  return (dispatch) => {
    dispatch(editPhotoStart());
    axios
      .put(`photos/${data.id}`, data)
      .then((res) => {
        const photo = res.data;
        dispatch(editPhotoSuccess(photo));
      })
      .catch((error) => dispatch(editPhotoFailure(error.message)));
  };
};

export const addPhotoStart = () => ({
  type: PhotosActionTypes.ADD_PHOTO_START,
});

export const addPhotoSuccess = (photo) => ({
  type: PhotosActionTypes.ADD_PHOTO_SUCCESS,
  payload: photo,
});

export const addPhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.ADD_PHOTO_FAILURE,
  payload: errorMessage,
});

export const addPhotoStartAsync = (data) => {
  return (dispatch) => {
    dispatch(addPhotoStart());
    axios
      .post(`photos/`, data)
      .then((res) => {
        const photo = res.data;
        dispatch(addPhotoSuccess(photo));
      })
      .catch((error) => dispatch(addPhotoFailure(error.message)));
  };
};

export const deletePhotoStart = () => ({
  type: PhotosActionTypes.DELETE_PHOTO_START,
});

export const deletePhotoSuccess = (id) => ({
  type: PhotosActionTypes.DELETE_PHOTO_SUCCESS,
  payload: id,
});

export const deletePhotoFailure = (errorMessage) => ({
  type: PhotosActionTypes.DELETE_PHOTO_FAILURE,
  payload: errorMessage,
});

export const deletePhotoStartAsync = (id) => {
  return (dispatch) => {
    dispatch(deletePhotoStart());
    axios
      .delete(`photos/${id}`)
      .then((res) => {
        console.log(res.status);
        dispatch(deletePhotoSuccess(id));
      })
      .catch((error) => dispatch(deletePhotoFailure(error.message)));
  };
};
