import { General } from "../general";

export namespace HostAuth {
  export namespace Login {
    export interface Request {
      loginId: string;
      password: string;
    }

    export interface Response extends General.SuccessResponse {
      loginStatus: number;
      user: General.User;
      token: string;
    }
  }

  export namespace SignUp {
    export interface Request {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      referred_by: string;
    }

    export interface Response extends General.SuccessResponse {
      userId: string;
    }
  }

  export namespace VerifyEmail {
    export interface Request {
      otp: string;
      userId: string;
    }

    export interface Response extends General.SuccessResponse {
      user: General.User;
    }
  }

  export namespace ResendVerificationOtp {
    export interface Request {
      userId: string;
    }

    export type Response = General.SuccessResponse;
  }

  export namespace ForgotPassword {
    export interface Request {
      email: string;
    }

    export interface Response extends General.SuccessResponse {
      email: string;
      userId: string;
    }
  }

  export namespace ResetPassword {
    export interface Request {
      body: {
        password: string;
      };
      params: {
        token: string;
        id: string;
      };
    }

    export type Response = General.SuccessResponse;
  }
}
