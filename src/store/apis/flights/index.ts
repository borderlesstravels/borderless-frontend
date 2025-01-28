import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";
import { DURATION_1_HR } from "../../../constants/time";

const FLIGHTS_REDUCER_PATH = "flights";

export const flightsApi = createApi({
  reducerPath: FLIGHTS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    fetchAirports: builder.query<Api.Flights.FetchAirports.Response, void>({
      query: () => ({
        url: "/flight/fetch-airports",
        keepUnusedDataFor: DURATION_1_HR,
      }),
    }),
    flightOfferSearch: builder.mutation<
      Api.Flights.FlightOfferSearch.Response,
      Api.Flights.FlightOfferSearch.Request
    >({
      query: (payload) => {
        return {
          url: "/flight/flight-offer-search",
          method: "POST",
          data: payload,
        };
      },
    }),
    getFlightOfferSearch: builder.query<
      Api.Flights.FlightOfferSearch.Response,
      Api.Flights.FlightOfferSearch.Request
    >({
      query: (payload) => {
        return {
          url: "/flight/flight-offer-search",
          method: "POST",
          data: payload,
          keepUnusedDataFor: DURATION_1_HR,
        };
      },
    }),
    getConfirmFlightPrice: builder.query<
      Api.Flights.ConfirmFlightPrice.Response,
      Api.Flights.ConfirmFlightPrice.Request
    >({
      query: (payload) => ({
        url: `/flight/confirm-price/${payload.id}`,
        method: "GET",
        keepUnusedDataFor: DURATION_1_HR,
      }),
    }),
    bookFlightUnauthenticated: builder.mutation<
      Api.Flights.BookFlight.Response,
      Api.Flights.BookFlight.Request
    >({
      query: (payload) => ({
        url: `/flight/book-flight-no-auth/${payload.query.id}`,
        method: "POST",
        data: payload.body,
      }),
    }),
    bookFlightAuthenticated: builder.mutation<
      Api.Flights.BookFlight.Response,
      Api.Flights.BookFlight.Request
    >({
      query: (payload) => ({
        url: `/flight/book-flight-auth/${payload.query.id}`,
        method: "POST",
        data: payload.body,
      }),
    }),
    fetchTicketDetails: builder.query<
      Api.Flights.FetchTicketDetails.Response,
      Api.Flights.FetchTicketDetails.Request
    >({
      query: (payload) => ({
        url: `/flight/flight-booking-details/${payload.reference}`,
      }),
    }),
  }),
});

export const {
  useFetchAirportsQuery,
  useBookFlightAuthenticatedMutation,
  useBookFlightUnauthenticatedMutation,
  useFetchTicketDetailsQuery,
  useFlightOfferSearchMutation,
  useGetFlightOfferSearchQuery,
  useGetConfirmFlightPriceQuery,
} = flightsApi;
