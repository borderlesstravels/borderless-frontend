import { General } from "../general";

export namespace HostProfileSettings {
  export namespace GetHostProfile {
    export interface Response extends General.SuccessResponse {
      data: {
        _id: string;
        first_name: string;
        last_name: string;
        email: string;
        referred_by: string;
        status: string;
        priceAlert: boolean;
        travelAlert: boolean;
        email_verified: boolean;
        createdAt: string;
        __v: number;
        bookings: number;
      };
    }
  }

  export namespace GetHostReviews {
    export interface Response extends General.SuccessResponse {
      data: any;
    }
  }

  export namespace GetHostNotifications {
    export interface Response extends General.SuccessResponse {
      data: any;
    }
  }

  export namespace UpdateHostProfile {
    export interface Request {
      first_name: string;
      last_name: string;
      gender: string;
    }

    export interface Response extends General.SuccessResponse {
      data: any;
    }
  }

  export namespace UpdateHostAvatar {
    export interface Request {
      file: File;
    }

    export interface Response extends General.SuccessResponse {
      data: any;
    }
  }
}
