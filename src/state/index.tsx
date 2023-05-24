import {
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export interface IGenericState {
  isFetching: boolean;
  data: any[];
  status: "loading" | "finished" | "error";
  errorMessage: null | string | any;
  message: null | string | any;
}
export const InitialGenericState: IGenericState = {
  isFetching: false,
  data: [],
  status: "finished",
  errorMessage: null,
  message: null,
};

export const createGenericSlice = <Reducers extends SliceCaseReducers<IGenericState>>({
  name = "",
  initialState = InitialGenericState,
  reducers,
  extraReducers,
}: {
  name: string;
  initialState?: IGenericState;
  reducers?: ValidateSliceCaseReducers<IGenericState, Reducers>;
  extraReducers?: any;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      clearMessage(state) {
        state.errorMessage = null;
        state.message = null;
      },
      ...reducers,
    },
    extraReducers,
  });
};
