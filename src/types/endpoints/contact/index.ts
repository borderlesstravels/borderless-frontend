import { General } from "../general";

export namespace Contact {
  export namespace ContactUs {
    export interface Request {
      name: string;
      email: string;
      company: string;
      subject: string;
      message: string;
    }

    export type Response = General.SuccessResponse;
  }
}
