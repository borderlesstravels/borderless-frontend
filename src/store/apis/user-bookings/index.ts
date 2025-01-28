import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const USER_BOOKINGS_REDUCER_PATH = "user-bookings";

export const userBookingsApi = createApi({
  reducerPath: USER_BOOKINGS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    getUserFlightBookings: builder.query<
      Api.UserBookings.GetUserFlightBookings.Response,
      void
    >({
      query: () => ({
        url: "/user-profile/flight-bookings",
      }),
    }),
    getUserSingleFlightBooking: builder.query<
      Api.UserBookings.GetUserSingleFlightBooking.Response,
      Api.UserBookings.GetUserSingleFlightBooking.Request
    >({
      query: (payload) => ({
        url: `/user-profile/single-flight-booking/${payload.id}`,
      }),
    }),
    getUserShortletBookings: builder.query<
      Api.UserBookings.GetUserShortletBookings.Response,
      void
    >({
      query: () => ({
        url: "/user-profile/shortlet-bookings",
      }),
    }),
    getUserSingleShortletBooking: builder.query<
      Api.UserBookings.GetUserSingleShortletBooking.Response,
      Api.UserBookings.GetUserSingleShortletBooking.Request
    >({
      query: (payload) => ({
        url: `/user-profile/single-shortlet-booking/${payload.id}`,
      }),
    }),
    createReview: builder.mutation<
      Api.UserBookings.CreateReview.Response,
      Api.UserBookings.CreateReview.Request
    >({
      query: (payload) => ({
        url: `/user-profile/create-review/${payload.query.id}`,
        method: "POST",
        data: payload.body,
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetUserFlightBookingsQuery,
  useGetUserShortletBookingsQuery,
  useGetUserSingleFlightBookingQuery,
  useGetUserSingleShortletBookingQuery,
} = userBookingsApi;
