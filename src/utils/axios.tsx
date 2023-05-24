import axios from "axios";

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = "A38D9B49-A2EA-49D5-A5C2-FDF007C180A4";

export const APISlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
    prepareHeaders(headers) {
      headers.set("x-api-key", apiKey);
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
