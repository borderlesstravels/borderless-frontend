import { General } from "../general";

export namespace UserProfileSettings {
  export namespace GetUser {
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
}
