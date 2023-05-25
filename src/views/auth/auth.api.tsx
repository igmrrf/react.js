import { retry } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../containers/types";
import { APISlice } from "../../utils/axios";

export const authAPI = APISlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: IUser }, any>({
      query: (credentials: any) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        },
      },
    }),

    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone",
    }),
  }),
});

export const { useLoginMutation, useGetErrorProneQuery } = authAPI;

export const {
  endpoints: { login },
} = authAPI;
