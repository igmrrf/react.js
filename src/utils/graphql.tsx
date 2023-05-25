// import { gql } from "@apollo/client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

export const postStatuses = ["draft", "published", "pending_review"] as const;

export interface Post {
  _id: string;
  coverImage: string;
  slug: string;
  title: string;
  brief: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface GetPostsResponse extends Pagination {
  data: {
    user: {
      publication: {
        posts: Post[];
      };
    };
  };
}

interface PostResponse {
  data: {
    post: Post;
  };
}

export const graphQLApi = createApi({
  baseQuery: graphqlRequestBaseQuery({
    url: "https://api.hashnode.com",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<GetPostsResponse, unknown>({
      query: () => ({
        document: gql`
          query GetPosts() {
            user(username: "igmrrf") {
              publication {
                posts(page: 0) {
                  _id
                  coverImage
                  slug
                  title
                  brief
                }
              }
            }
          }
        `,
      }),
    }),
    getPost: builder.query<Post, string>({
      query: (id) => ({
        document: gql`
        query GetPost($id: ID!) {
          post(id: ${id}) {
            id
            title
            body
          }
        }
        `,
      }),
      transformResponse: (response: PostResponse) => response.data.post,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery } = graphQLApi;
