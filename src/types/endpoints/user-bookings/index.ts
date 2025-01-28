import { General } from "../general";

export namespace UserBookings {
  export namespace GetUserFlightBookings {
    export interface Response extends General.SuccessResponse {
      data: General.FlightBooking[];
    }
  }

  export namespace GetUserSingleFlightBooking {
    export interface Request {
      id: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.FlightBooking;
    }
  }

  export namespace GetUserShortletBookings {
    export interface Response extends General.SuccessResponse {
      data: General.ShortletBooking[];
    }
  }

  export namespace GetUserSingleShortletBooking {
    export interface Request {
      id: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.ShortletBooking;
    }
  }

  export namespace CreateReview {
    export interface Request {
      query: {
        id: string;
      };
      body: {
        review: string;
        rating: number;
        product_type: string;
      };
    }

    export type Response = General.SuccessResponse;
  }
}
