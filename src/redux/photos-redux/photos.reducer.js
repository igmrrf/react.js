import PhotosActionTypes from "./photos.types";

const initialState = {
  isFetching: 0,
  photos: [],
};

const photosReducer = (state = initialState, action) => {
  switch (action.type) {
    case PhotosActionTypes.FETCH_PHOTOS_START:
      return {
        ...state,
        isFetching: +1,
      };
    case PhotosActionTypes.FETCH_PHOTOS_SUCCESS:
      return {
        ...state,
        photos: action.payload,
        isFetching: -1,
      };
    case PhotosActionTypes.FETCH_PHOTOS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: -1,
      };
    default:
      return state;
  }
};
export default photosReducer;
