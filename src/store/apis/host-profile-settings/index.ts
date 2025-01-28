import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const HOST_PROFILE_SETTINGS_REDUCER_PATH = "host-profile-settings";

export const hostProfileSettingsApi = createApi({
  reducerPath: HOST_PROFILE_SETTINGS_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    getHostProfile: builder.query<
      Api.HostProfileSettings.GetHostProfile.Response,
      void
    >({
      query: () => ({
        url: "/host-profile/profile",
      }),
    }),
    getHostReviews: builder.query<
      Api.HostProfileSettings.GetHostReviews.Response,
      void
    >({
      query: () => ({
        url: "/host-profile/reviews",
      }),
    }),
    getHostNotifications: builder.query<
      Api.HostProfileSettings.GetHostNotifications.Response,
      void
    >({
      query: () => ({
        url: "/host-profile/notifications",
      }),
    }),
    updateHostProfile: builder.mutation<
      Api.HostProfileSettings.UpdateHostProfile.Response,
      Api.HostProfileSettings.UpdateHostProfile.Request
    >({
      query: (payload) => ({
        url: "/host-profile/update-profile",
        method: "POST",
        data: payload,
      }),
    }),
    updateHostAvatar: builder.mutation<
      Api.HostProfileSettings.UpdateHostAvatar.Response,
      Api.HostProfileSettings.UpdateHostAvatar.Request
    >({
      query: (payload) => {
        const formData = new FormData();
        formData.append("avatar", payload.file);

        return {
          url: "/host-profile/update-profile-avatar",
          method: "POST",
          data: formData,
        };
      },
    }),
  }),
});

export const {
  useGetHostNotificationsQuery,
  useGetHostProfileQuery,
  useGetHostReviewsQuery,
  useUpdateHostAvatarMutation,
  useUpdateHostProfileMutation,
} = hostProfileSettingsApi;
