import { IComment } from "../../containers/types";
import { APISlice } from "../../utils/axios";

const CommentAPISlice = APISlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchComments: builder.query<IComment[], void>({
        query() {
          return `/comments`;
        },
        // Pick out data and prevent nested properties in a hook or selector
        transformResponse: (response: { data: IComment[] }, meta, arg) => {
          console.log({ meta, arg });
          return response.data;
        },
        // Pick out errors and prevent nested properties in a hook or selector
        transformErrorResponse: (
          response: { status: string | number },
          meta,
          arg
        ) => {
          console.log({ meta, arg });

          return response.status;
        },
        async onCacheEntryAdded(
          arg,
          {
            dispatch,
            getState,
            extra,
            requestId,
            cacheEntryRemoved,
            cacheDataLoaded,
            getCacheEntry,
            updateCachedData,
          }
        ) {
          console.log({
            arg,
            dispatch,
            getState,
            extra,
            requestId,
            cacheEntryRemoved,
            cacheDataLoaded,
            getCacheEntry,
            updateCachedData,
          });
        },
        // providesTags: ["Comments"],
      }),
      fetchComment: builder.query<IComment[], number>({
        query(id = 1) {
          return `/comments/${id}`;
        },
        // providesTags: (_result, _err, id) => [{ type: "Comments", id }],
      }),
      addComment: builder.mutation<IComment, Partial<IComment>>({
        query(body) {
          return {
            url: `/comments`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["Comments"],
      }),
      updateComment: builder.mutation<IComment, Partial<IComment>>({
        query(data) {
          const { id, ...body } = data;
          return {
            url: `/comments/${id}`,
            method: "PUT",
            body,
          };
        },
        async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
          const patchResult = dispatch(
            CommentAPISlice.util.updateQueryData(
              "fetchComment",
              Number(id),
              (draft) => {
                Object.assign(draft, patch);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch {
            patchResult.undo();
          }
        },
        invalidatesTags: (_result, _error, { id }) => [
          { type: "Comments", id },
        ],
      }),
      deleteComment: builder.mutation<IComment, number>({
        query(id) {
          return {
            url: `comment/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (comment) => [{ type: "Comments", id: comment?.id }],
      }),
    };
  },
});

export const {
  useFetchCommentsQuery,
  useFetchCommentQuery,
  useAddCommentMutation,
} = CommentAPISlice;
