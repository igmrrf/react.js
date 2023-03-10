import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";

export const fetchPhotosStartAsync = createAsyncThunk(
  "photos/fetchPhotosStartAsync",
  async () => {
    const response = await axios.get("Photos");
    const photos = response.data;
    return photos;
  }
);

export const editPhotoStartAsync = createAsyncThunk(
  "photos/editPhotoAsync",
  async (photo) => {
    const response = await axios.put(`Photos/${photo.id}`, photo);
    const editedPhoto = response.data;

    return editedPhoto;
  }
);

export const addPhotoStartAsync = createAsyncThunk(
  "photos/addPhotoStartAsync",
  async (photo) => {
    const response = await axios.post(`Photos/`, photo);
    const addedPhoto = response.data;

    return addedPhoto;
  }
);

export const deletePhotoStartAsync = createAsyncThunk(
  "photos/deletePhotoStartAsync",
  async (photo) => {
    const response = await axios.delete(`Photos/${photo.id}`);
    const deletedPhoto = { ...photo, ...response.data };

    return deletedPhoto;
  }
);

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    clearPhotoMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchPhotosStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchPhotosStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(editPhotoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editPhotoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editPhotoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addPhotoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addPhotoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addPhotoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deletePhotoStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deletePhotoStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = deleteItem(state.data, action.payload);
      })
      .addCase(deletePhotoStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearPhotoMessage,
  fetchPhotosStart,
  fetchPhotosFailure,
  fetchPhotosSuccess,
  editPhotoStart,
  editPhotoFailure,
  editPhotoSuccess,
  addPhotoStart,
  addPhotoFailure,
  addPhotoSuccess,
  deletePhotoStart,
  deletePhotoFailure,
  deletePhotoSuccess,
} = photoSlice.actions;

export const selectPhotosData = (state) => state.photos.data;

export const selectPhotosErrorMessage = (state) => state.photos.errorMessage;

export const selectPhotosIsFetching = (state) => state.photos.isFetching;

export default photoSlice.reducer;
