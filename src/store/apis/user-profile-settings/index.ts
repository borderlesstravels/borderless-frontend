import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const USER_PROFILE_SETTINGS_REDUCER_PATH = "user-profile-settings";

export const userProfileSettingsApi = createApi({
  reducerPath: USER_PROFILE_SETTINGS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query<
      Api.UserProfileSettings.GetUser.Response,
      void
    >({
      query: () => ({
        url: "/user-profile/user",
      }),
    }),
  }),
});

export const { useGetUserProfileQuery } = userProfileSettingsApi;
