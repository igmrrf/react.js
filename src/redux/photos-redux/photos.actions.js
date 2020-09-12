import PhotosActionTypes from "./photos.types";
import axios from "../../utils/axios";

const fetchPhotosStart = () => ({
  type: PhotosActionTypes.FETCH_PHOTOS_START,
});

const fetchPhotosSuccess = (photos) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_SUCCESS,
  payload: photos,
});

const fetchPhotosFailure = (errorMessage) => ({
  type: PhotosActionTypes.FETCH_PHOTOS_FAILURE,
  payload: errorMessage,
});

export const fetchPhotosAsyncStart = () => {
  return (dispatch) => {
    dispatch(fetchPhotosStart());
    axios
      .get("photos")
      .then((res) => {
        const photos = res.data;
        dispatch(fetchPhotosSuccess(photos));
      })
      .catch((err) => dispatch(fetchPhotosFailure(err.message)));
  };
};
