import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";

export const fetchAlbumsStartAsync = createAsyncThunk(
  "albums/fetchAlbumsStartAsync",
  async () => {
    const response = await axios.get("Albums");
    const albums = response.data;
    return albums;
  }
);

export const editAlbumStartAsync = createAsyncThunk(
  "albums/editAlbumAsync",
  async (album) => {
    const response = await axios.put(`Albums/${album.id}`, album);
    const editedAlbum = response.data;

    return editedAlbum;
  }
);

export const addAlbumStartAsync = createAsyncThunk(
  "albums/addAlbumStartAsync",
  async (album) => {
    const response = await axios.album(`Albums/`, album);
    const addedAlbum = response.data;

    return addedAlbum;
  }
);

export const deleteAlbumStartAsync = createAsyncThunk(
  "albums/deleteAlbumStartAsync",
  async (id) => {
    const response = await axios.delete(`Albums/${id}`);
    const deletedAlbum = response.data;

    return deletedAlbum;
  }
);

const initialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearAlbumMessage(state) {
      state.errorMessage = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumsStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchAlbumsStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(fetchAlbumsStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(editAlbumStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(editAlbumStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = updateItem(state.data, action.payload);
      })
      .addCase(editAlbumStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(addAlbumStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(addAlbumStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = addNewItem(state.data, action.payload);
      })
      .addCase(addAlbumStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });

    builder
      .addCase(deleteAlbumStartAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(deleteAlbumStartAsync.fulfilled, (state, action) => {
        state.isFetching = false;
        state.errorMessage = deleteItem(state.data, action.payload);
      })
      .addCase(deleteAlbumStartAsync.rejected, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      });
  },
});

export const {
  clearAlbumMessage,
  fetchAlbumsStart,
  fetchAlbumsFailure,
  fetchAlbumsSuccess,
  editAlbumStart,
  editAlbumFailure,
  editAlbumSuccess,
  addAlbumStart,
  addAlbumFailure,
  addAlbumSuccess,
  deleteAlbumStart,
  deleteAlbumFailure,
  deleteAlbumSuccess,
} = albumSlice.actions;

export const selectAlbumsData = (state) => state.albums.data;

export const selectAlbumsErrorMessage = (state) => state.albums.errorMessage;

export const selectAlbumsIsFetching = (state) => state.albums.isFetching;

export default albumSlice.reducer;
