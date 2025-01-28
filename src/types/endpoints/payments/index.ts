import { General } from "../general";

export namespace Payments {
  export namespace RecordFlightPayment {
    export interface Request {
      service_name: string;
      booking_reference: string;
      transaction_reference: string;
      amount: number;
      time: string;
    }

    export type Response = General.SuccessResponse;
  }
}
