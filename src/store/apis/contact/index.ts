import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const CONTACT_REDUCER_PATH = "contact";

export const contactApi = createApi({
  reducerPath: CONTACT_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    contactUs: builder.mutation<
      Api.Contact.ContactUs.Response,
      Api.Contact.ContactUs.Request
    >({
      query: (payload) => ({
        url: "/website/contact-us",
        method: "POST",
        data: payload,
      }),
    }),
  }),
});

export const { useContactUsMutation } = contactApi;
