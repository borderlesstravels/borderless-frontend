import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const HOST_AUTH_REDUCER_PATH = "host-auth";

export const hostAuthApi = createApi({
  reducerPath: HOST_AUTH_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    hostLogin: builder.mutation<
      Api.HostAuth.Login.Response,
      Api.HostAuth.Login.Request
    >({
      query: (payload) => ({
        url: "/host-auth/login",
        method: "POST",
        data: payload,
      }),
    }),
    hostSignUp: builder.mutation<
      Api.HostAuth.SignUp.Response,
      Api.HostAuth.SignUp.Request
    >({
      query: (payload) => ({
        url: "/host-auth/signup",
        method: "POST",
        data: payload,
      }),
    }),
    hostVerifyEmail: builder.mutation<
      Api.HostAuth.VerifyEmail.Response,
      Api.HostAuth.VerifyEmail.Request
    >({
      query: (payload) => ({
        url: "/host-auth/verify-email",
        method: "POST",
        data: payload,
      }),
    }),
    hostResendVerificationOtp: builder.mutation<
      Api.HostAuth.ResendVerificationOtp.Response,
      Api.HostAuth.ResendVerificationOtp.Request
    >({
      query: (payload) => ({
        url: "/host-auth/resend-verification-otp",
        method: "POST",
        data: payload,
      }),
    }),
    hostForgotPassword: builder.mutation<
      Api.HostAuth.ForgotPassword.Response,
      Api.HostAuth.ForgotPassword.Request
    >({
      query: (payload) => ({
        url: "/host-auth/forgot-password",
        method: "POST",
        data: payload,
      }),
    }),
    hostResetPassword: builder.mutation<
      Api.HostAuth.ResetPassword.Response,
      Api.HostAuth.ResetPassword.Request
    >({
      query: (payload) => ({
        url: "/host-auth/reset-password",
        method: "POST",
        data: payload.body,
        params: payload.params,
      }),
    }),
  }),
});

export const {
  useHostForgotPasswordMutation,
  useHostLoginMutation,
  useHostResendVerificationOtpMutation,
  useHostResetPasswordMutation,
  useHostSignUpMutation,
  useHostVerifyEmailMutation,
} = hostAuthApi;
