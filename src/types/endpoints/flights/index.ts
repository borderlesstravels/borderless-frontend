import { General } from "../general";

export namespace Flights {
  export namespace FetchAirports {
    export interface Airport {
      city: string;
      city_code: string;
      country: string;
      iata_code: string;
      name: string;
    }

    export interface Response extends General.SuccessResponse {
      data: Airport[];
    }
  }

  export namespace FlightOfferSearch {
    export interface FlightOffer {
      id: string;
      fare_basis: string;
      amount: number;
      travelers_price: General.TravelerPrice[];
      price_summary: General.PriceSummary[];
      currency: string;
      total_duration: number;
      outbound: General.Outbound[];
      inbound: [];
      total_outbound_duration: number;
      total_inbound_duration: number;
      outbound_stops: number;
      inbound_stops: number;
      pricing: General.Pricing;
      office_id: string;
    }

    export interface Request {
      origin: string;
      destination: string;
      departure_date: string;
      adults: number;
      cabin: string;
      children: number;
      infants: number;
      return_date: string;
    }

    export interface Response extends General.SuccessResponse {
      data: FlightOffer[];
    }
  }

  export namespace ConfirmFlightPrice {
    export interface Request {
      id: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.Flight;
    }
  }

  export namespace BookFlight {
    export interface Request {
      query: {
        id: string;
      };
      body: {
        contact_details: {
          c_first_name: string;
          c_last_name: string;
          c_email: string;
          c_phone_number: string;
          c_relationship_to_p: string;
        };
        passenger_details: General.PassengerDetail[];
      };
    }

    export interface Response extends General.SuccessResponse {
      data: General.Flight;
    }
  }

  export namespace FetchTicketDetails {
    export interface Request {
      reference: string;
    }

    export interface Response extends General.SuccessResponse {
      data: General.Flight;
    }
  }
}
