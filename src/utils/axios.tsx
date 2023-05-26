import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { RootState } from "../state/store";

const apiKey = "A38D9B49-A2EA-49D5-A5C2-FDF007C180A4";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com",
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authentication", `Bearer ${token}`);
    }
    headers.set("x-api-key", apiKey);
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const APISlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Albums", "Comments", "Photos", "Posts", "Todos", "Users"],
  endpoints: () => ({}),
});

// export const enhancedApi = APISlice.enhanceEndpoints({
//   endpoints: () => ({
//     getPost: () => "test",
//   }),
// });

export default axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  headers: {
    "Content-Type": "application/json",
  },
});
