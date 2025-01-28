import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const SHORTLETS_REDUCER_PATH = "shortlets";

export const shortletsApi = createApi({
  reducerPath: SHORTLETS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    fetchShortlets: builder.query<Api.Shortlets.FetchShortlets.Response, void>({
      query: () => ({
        url: "/shortlet/fetch-shortlets",
      }),
    }),
    fetchShortletsLocations: builder.query<
      Api.Shortlets.FetchShortletsLocations.Response,
      void
    >({
      query: () => ({
        url: "/shortlet/fetch-shortlets-location",
      }),
    }),
    fetchSingleShortlet: builder.query<
      Api.Shortlets.FetchSingleShortlet.Response,
      Api.Shortlets.FetchSingleShortlet.Request
    >({
      query: (payload) => ({
        url: `/shortlet/fetch-shortlet/${payload.id}`,
      }),
    }),
    fetchShortletReviews: builder.query<
      Api.Shortlets.FetchShortletReviews.Response,
      Api.Shortlets.FetchShortletReviews.Request
    >({
      query: (payload) => ({
        url: `/shortlet/fetch-shortlet-reviews/${payload.id}`,
      }),
    }),
    bookShortlet: builder.mutation<
      Api.Shortlets.BookShortlet.Response,
      Api.Shortlets.BookShortlet.Request
    >({
      query: (payload) => ({
        url: `/shortlet/book-shortlet-auth/${payload.query.id}`,
        method: "POST",
        data: payload.body,
      }),
    }),
  }),
});

export const {
  useBookShortletMutation,
  useFetchShortletReviewsQuery,
  useFetchShortletsLocationsQuery,
  useFetchShortletsQuery,
  useFetchSingleShortletQuery,
} = shortletsApi;
