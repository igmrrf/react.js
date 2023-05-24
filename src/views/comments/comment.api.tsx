import { IComment } from "../../containers/types";
import { APISlice } from "../../utils/axios";

const CommentAPISlice = APISlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchComments: builder.query<IComment[], void>({
        query() {
          return `/comments`;
        },
      }),
      fetchComment: builder.query<IComment[], number | void>({
        query(id = 1) {
          return `/comments/${id}`;
        },
      }),
    };
  },
});

export const { useFetchCommentsQuery, useFetchCommentQuery } = CommentAPISlice;
