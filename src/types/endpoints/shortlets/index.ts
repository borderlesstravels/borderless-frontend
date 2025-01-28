import { General } from "../general";

export namespace Shortlets {
  export namespace FetchShortlets {
    export interface Response extends General.SuccessResponse {
      data: General.Shortlet[];
    }
  }

  export namespace FetchShortletsLocations {
    export interface Location {
      _id: string;
      apartment_name: string;
      country: string;
      state: string;
      lga: string;
      address: string;
    }

    export interface Response extends General.SuccessResponse {
      data: Location[];
    }
  }

  export namespace FetchSingleShortlet {
    export interface Request {
      id: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.Shortlet;
    }
  }

  export namespace FetchShortletReviews {
    export interface Review {
      _id: string;
      reviewer_id: string;
      reviewer_name: string;
      product_reviewed: string;
      review: string;
      rating: string;
      createdAt: string;
      __v: number;
    }

    export interface Request {
      id: string;
    }

    export interface Response extends General.SuccessResponse {
      data: Review[];
    }
  }

  export namespace BookShortlet {
    export interface Request {
      query: {
        id: string;
      };
      body: {
        check_in_date: string;
        check_out_date: string;
        check_in_time: string;
        check_out_time: string;
        price: number;
      };
    }

    export type Response = General.SuccessResponse;
  }
}
