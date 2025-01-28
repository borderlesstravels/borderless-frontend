import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const USER_DASHBOARD_AUTH_REDUCER_PATH = "user-dashboard-auth";

export const userDashboardAuthApi = createApi({
  reducerPath: USER_DASHBOARD_AUTH_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    userLogout: builder.mutation<
      Api.UserDashboardAuth.UserLogout.Response,
      void
    >({
      query: () => ({
        url: "/user-auth/logout",
        method: "POST",
        data: {},
      }),
    }),
  }),
});

export const { useUserLogoutMutation } = userDashboardAuthApi;
