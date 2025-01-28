import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const PAYMENTS_REDUCER_PATH = "payments";

export const paymentsApi = createApi({
  reducerPath: PAYMENTS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    recordFlightPayment: builder.mutation<
      Api.Payments.RecordFlightPayment.Response,
      Api.Payments.RecordFlightPayment.Request
    >({
      query: (payload) => ({
        url: "/website/record-payment",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useRecordFlightPaymentMutation } = paymentsApi;
