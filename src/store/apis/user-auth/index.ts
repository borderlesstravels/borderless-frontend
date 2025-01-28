import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../config/axiosBaseQuery";
import { Api } from "../../../types";

const USER_AUTH_REDUCER_PATH = "user-auth";

export const userAuthApi = createApi({
  reducerPath: USER_AUTH_REDUCER_PATH,
  baseQuery: axiosBaseQuery({
    transformResponse: (response) => response,
  }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      Api.UserAuth.Login.Response,
      Api.UserAuth.Login.Request
    >({
      query: (payload) => ({
        url: "/user-auth/login",
        method: "POST",
        data: payload,
      }),
    }),
    userSignUp: builder.mutation<
      Api.UserAuth.SignUp.Response,
      Api.UserAuth.SignUp.Request
    >({
      query: (payload) => ({
        url: "/user-auth/signup",
        method: "POST",
        data: payload,
      }),
    }),
    userVerifyEmail: builder.mutation<
      Api.UserAuth.VerifyEmail.Response,
      Api.UserAuth.VerifyEmail.Request
    >({
      query: (payload) => ({
        url: "/user-auth/verify-email",
        method: "POST",
        data: payload,
      }),
    }),
    userResendVerificationOtp: builder.mutation<
      Api.UserAuth.ResendVerificationOtp.Response,
      Api.UserAuth.ResendVerificationOtp.Request
    >({
      query: (payload) => ({
        url: "/user-auth/resend-verification-otp",
        method: "POST",
        data: payload,
      }),
    }),
    userForgotPassword: builder.mutation<
      Api.UserAuth.ForgotPassword.Response,
      Api.UserAuth.ForgotPassword.Request
    >({
      query: (payload) => ({
        url: "/user-auth/forgot-password",
        method: "POST",
        data: payload,
      }),
    }),
    userResetPassword: builder.mutation<
      Api.UserAuth.ResetPassword.Response,
      Api.UserAuth.ResetPassword.Request
    >({
      query: (payload) => ({
        url: "/user-auth/reset-password",
        method: "POST",
        data: payload.body,
        params: payload.params,
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserVerifyEmailMutation,
  useUserForgotPasswordMutation,
  useUserResendVerificationOtpMutation,
  useUserResetPasswordMutation,
} = userAuthApi;
