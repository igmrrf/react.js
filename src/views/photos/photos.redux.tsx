import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import { IPhoto } from "../../containers/types";
import { RootState } from "../../state/store";
import axios from "../../utils/axios";
import { addNewItem, deleteItem, updateItem } from "../../utils/modifier";
import { IInitialState } from "../types";

export const userEntity = new schema.Entity("users");
export const commentEntity = new schema.Entity("comments", {
  commenter: userEntity,
});
export const photoEntity = new schema.Entity("photos", {
  author: userEntity,
  comments: [commentEntity],
});

export const fetchPhotosStartAsync = createAsyncThunk(
  "photos/fetchPhotosStartAsync",
  async () => {
    const response = await axios.get("Photos");
    const data = response.data;
    const normalized = normalize<any, { [key: string]: IPhoto }>(
      data,
      photoEntity
    );
    // const normalized = normalize<
    //   any,
    //   {
    //     photos: { [key: string]: IPhoto };
    //     users: { [key: string]: IUser };
    //     comments: { [key: string]: IComment };
    //   }
    // >(data, photoEntity);
    console.log({ normal: normalized.entities });
    console.log({ data });
    return { data, entities: normalized.entities };
  }
);

export const editPhotoStartAsync = createAsyncThunk(
  "photos/editPhotoAsync",
  async (photo: IPhoto) => {
    const response = await axios.put(`Photos/${photo.id}`, photo);
    const editedPhoto = response.data;

    return editedPhoto;
  }
);

export const addPhotoStartAsync = createAsyncThunk(
  "photos/addPhotoStartAsync",
  async (photo: IPhoto) => {
    const response = await axios.post(`Photos/`, photo);
    const addedPhoto = response.data;

    return addedPhoto;
  }
);

export const deletePhotoStartAsync = createAsyncThunk(
  "photos/deletePhotoStartAsync",
  async (photo: IPhoto) => {
    const response = await axios.delete(`Photos/${photo.id}`);
    const deletedPhoto = { ...photo, ...response.data };

    return deletedPhoto;
  }
);
const levelState: IInitialState = {
  isFetching: false,
  data: [],
  errorMessage: null,
  message: null,
};
const photosAdapter = createEntityAdapter();
const initialState = photosAdapter.getInitialState(levelState);

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
        state.data = action.payload.data;
        console.log({ entities: action.payload.entities });
        photosAdapter.upsertMany(state, action.payload.entities);
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
        const { id, ...changes } = action.payload;
        photosAdapter.updateOne(state, { id, changes });
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

export const { clearPhotoMessage } = photoSlice.actions;

// Rename the exports for readability in component usage
// export const {
//   selectById: selectPhotoById,
//   selectIds: selectPhotoIds,
//   selectEntities: selectPhotoEntities,
//   selectAll: selectAllPhotos,
//   selectTotal: selectTotalPhotos,
// } = photosAdapter.getSelectors((state) => state.users);

export const selectPhotosData = (state: RootState) => state.photos.data;

export const selectPhotosErrorMessage = (state: RootState) =>
  state.photos.errorMessage;

export const selectPhotosIsFetching = (state: RootState) =>
  state.photos.isFetching;

export default photoSlice.reducer;
