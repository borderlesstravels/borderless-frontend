import { regexConstants } from "../../../../services/constants/validation-regex";
import { formatDate, parseBoolean } from "../../../../services/utils/data-manipulation-utilits";

export interface IStayPaymentData {
      amount: number;
      email: string;
      booking_reference: string;
}

export interface IStayBookingPayload {
      contact_details: {
            c_first_name: string,
            c_last_name: string,
            c_email: string,
            c_phone_number: string,
            c_relationship_to_p: string
      },
      passenger_details: {
            passenger_type: string,
            first_name: string,
            last_name: string,
            dob: string,
            gender: string,
            title: string,
            email: string,
            phone_number: string,
            documents?: {
                  number: string,
                  issuing_date: string,
                  expiry_date: string,
                  issuing_country: string,
                  nationality_country: string,
                  document_type: string,
                  holder: boolean
            },
            number?: string,
            issuing_date?: string,
            expiry_date?: string,
            issuing_country?: string,
            nationality_country?: string,
            document_type?: string,
            holder?: string,
      }[]
}
export interface IContactPayload {
      c_first_name: string,
      c_last_name: string,
      c_email: string,
      c_phone_number: string,
      c_relationship_to_p: string
}
export interface IPassengerPayload {
      passenger_type: string,
      first_name: string,
      last_name: string,
      dob: string,
      gender: string,
      title: string,
      email: string,
      phone_number: string,
      documents?: {
            number: string,
            issuing_date: string,
            expiry_date: string,
            issuing_country: string,
            nationality_country: string,
            document_type: string,
            holder: boolean
      },
      number?: string,
      issuing_date?: string,
      expiry_date?: string,
      issuing_country?: string,
      nationality_country?: string,
      document_type?: string,
      holder?: string,
}

export interface IStayBookingTouchedPayload {
      contact_details: {
            c_first_name: boolean,
            c_last_name: boolean,
            c_email: boolean,
            c_phone_number: boolean,
            c_relationship_to_p: boolean
      },
      passenger_details: {
            passenger_type: boolean,
            first_name: boolean,
            last_name: boolean,
            dob: boolean,
            gender: boolean,
            title: boolean,
            email: boolean,
            phone_number: boolean,
            documents?: {
                  number: boolean,
                  issuing_date: boolean,
                  expiry_date: boolean,
                  issuing_country: boolean,
                  nationality_country: boolean,
                  document_type: boolean,
                  holder: boolean
            }
            number?: boolean,
            issuing_date?: boolean,
            expiry_date?: boolean,
            issuing_country?: boolean,
            nationality_country?: boolean,
            document_type?: boolean,
            holder?: boolean
      }[]
}

export const stayPaymentInitialData = {
      email: '',
      amount: 0,
      booking_reference: '',
}

export const initialStayBookingPayload = {
      contact_details: {
            c_first_name: "",
            c_last_name: "",
            c_email: "",
            c_phone_number: "",
            c_relationship_to_p: ""
      },
      passenger_details: [
            {
                  passenger_type: "",
                  first_name: "",
                  last_name: "",
                  dob: "",
                  gender: "",
                  title: "",
                  email: "",
                  phone_number: "",
                  number: "",
                  issuing_date: "",
                  expiry_date: "",
                  issuing_country: "",
                  nationality_country: "",
                  document_type: "",
                  holder: ""
            }
      ]
}
export const initialContactPayload = {
      c_first_name: "",
      c_last_name: "",
      c_email: "",
      c_phone_number: "",
      c_relationship_to_p: ""
}
export const initialPassengerPayload = {
      passenger_type: "",
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      title: "",
      email: "",
      phone_number: "",
      number: "",
      issuing_date: "",
      expiry_date: "",
      issuing_country: "",
      nationality_country: "",
      document_type: "",
      holder: ""
}
export const generateInitialPassengerPayload = () => {
      return {
            passenger_type: "",
            first_name: "",
            last_name: "",
            dob: "",
            gender: "",
            title: "",
            email: "",
            phone_number: "",
            number: "",
            issuing_date: "",
            expiry_date: "",
            issuing_country: "",
            nationality_country: "",
            document_type: "",
            holder: ""
      }
}
export const initialStayTouchedData = {
      contact_details: {
            c_first_name: false,
            c_last_name: false,
            c_email: false,
            c_phone_number: false,
            c_relationship_to_p: false
      },
      passenger_details: [
            {
                  passenger_type: false,
                  first_name: false,
                  last_name: false,
                  dob: false,
                  gender: false,
                  title: false,
                  email: false,
                  phone_number: false,
                  documents: {
                        number: false,
                        issuing_date: false,
                        expiry_date: false,
                        issuing_country: false,
                        nationality_country: false,
                        document_type: false,
                        holder: false
                  }
            }
      ]
}

export const initialContactTouchedData = {
      c_first_name: false,
      c_last_name: false,
      c_email: false,
      c_phone_number: false,
      c_relationship_to_p: false
}

export const initialPassengerTouchedData = {
      passenger_type: false,
      first_name: false,
      last_name: false,
      dob: false,
      gender: false,
      title: false,
      email: false,
      phone_number: false,
      documents: {
            number: false,
            issuing_date: false,
            expiry_date: false,
            issuing_country: false,
            nationality_country: false,
            document_type: false,
            holder: false
      }
}

export const validateForErrors = (values: IStayBookingPayload, dr: boolean, stayDetails: any): {bookingErr: IStayBookingPayload, errors: object} => {
      
      console.log({dr})
      let hasErrors = false;
      const errors: any = {};
      const stayErrors: IStayBookingPayload = {
            contact_details: {
                  c_first_name: "",
                  c_last_name: "",
                  c_email: "",
                  c_phone_number: "",
                  c_relationship_to_p: ""
            },
            passenger_details: []
      };

      if(!values.contact_details?.c_email) {
            stayErrors.contact_details.c_email = 'Email is required';
            hasErrors = true;
      } else if(!regexConstants.emailPattern.test(values.contact_details?.c_email)) {
            stayErrors.contact_details.c_email = 'Invalid email';
            hasErrors = true;
      }
      if(!values.contact_details?.c_first_name) {
            stayErrors.contact_details.c_first_name = 'First name is required';
            hasErrors = true;
      }
      if(!values.contact_details?.c_last_name) {
            stayErrors.contact_details.c_last_name = 'Last name is required';
            hasErrors = true;
      }
      if(!values.contact_details?.c_phone_number) {
            stayErrors.contact_details.c_phone_number = 'Phone number is required';
            hasErrors = true;
      } else if(!regexConstants.phonePattern.test(values.contact_details?.c_phone_number)) {
            stayErrors.contact_details.c_phone_number = 'Invalid phone number';
            hasErrors = true;
      }
      if(!values.contact_details?.c_relationship_to_p) {
            stayErrors.contact_details.c_relationship_to_p = 'Relationship is required';
            hasErrors = true;
      }
      values.passenger_details.map((info, index) => {
            const passengerErrorObject = generateInitialPassengerPayload();
            if(!info.passenger_type) {
                  passengerErrorObject.passenger_type = 'Passenger type is required';
                  hasErrors = true;
            } else {passengerErrorObject.passenger_type = '';}
            if(!info.first_name) {
                  passengerErrorObject.first_name = 'First name is required';
                  hasErrors = true;
            } else {passengerErrorObject.first_name = '';}
            if(!info.last_name) {
                  passengerErrorObject.last_name = 'Last name is required';
                  hasErrors = true;
            } else {passengerErrorObject.last_name = '';}
            if(!info.dob) {
                  passengerErrorObject.dob = 'Date of birth is required';
                  hasErrors = true;
            } else {passengerErrorObject.dob = '';}
            if(!info.gender) {
                  passengerErrorObject.gender = 'Gender is required';
                  hasErrors = true;
            } else {passengerErrorObject.gender = '';}
            if(!info.title) {
                  passengerErrorObject.title = 'Title is required';
                  hasErrors = true;
            } else {passengerErrorObject.title = '';}
            if(!info.email) {
                  passengerErrorObject.email = 'Email is required';
                  hasErrors = true;
            } else if(!regexConstants.emailPattern.test(info.email)) {
                  passengerErrorObject.email = 'Invalid email';
                  hasErrors = true;
            } else {passengerErrorObject.email = '';}
            if(!info.phone_number) {
                  passengerErrorObject.phone_number = 'Phone number is required';
                  hasErrors = true;
            } else if(!regexConstants.phonePattern.test(info.phone_number)) {
                  passengerErrorObject.phone_number = 'Invalid phone number';
                  hasErrors = true;
            } else {passengerErrorObject.phone_number = '';}
            if(dr) {
                  if(!info.number) {
                        passengerErrorObject.number = 'Document number is required';
                        hasErrors = true;
                  } else {passengerErrorObject.number = '';}
                  if(!info.issuing_date) {
                        passengerErrorObject.issuing_date = 'Issuing date is required';
                        hasErrors = true;
                  } else {passengerErrorObject.issuing_date = '';}
                  if(!info.expiry_date) {
                        passengerErrorObject.expiry_date = 'Expiry date is required';
                        hasErrors = true;
                  } else if(new Date(info.expiry_date).getTime() < new Date(stayDetails?.outbound[0]?.departure_time).getTime()) {
                        passengerErrorObject.expiry_date = `Document already expired before the stay date (${formatDate(stayDetails?.outbound[0]?.departure_time)})`;
                        hasErrors = true;
                  } else {passengerErrorObject.expiry_date = '';}
                  if(!info.issuing_country) {
                        passengerErrorObject.issuing_country = 'Issuing country is required';
                        hasErrors = true;
                  } else {passengerErrorObject.issuing_country = '';}
                  if(!info.nationality_country) {
                        passengerErrorObject.nationality_country = 'Nationality is required';
                        hasErrors = true;
                  } else {passengerErrorObject.nationality_country = '';}
                  if(!info.document_type) {
                        passengerErrorObject.document_type = 'Document type is required';
                        hasErrors = true;
                  } else {passengerErrorObject.document_type = '';}
                  if(!info.holder) {
                        passengerErrorObject.holder = 'Document holder is required';
                        hasErrors = true;
                  } else {passengerErrorObject.holder = '';}
            }
            stayErrors.passenger_details.push(passengerErrorObject);
      })

      if(hasErrors) {
            errors.any = 'true';
      }

      return {bookingErr: stayErrors, errors}
}

export const activateAllTouchFields = (touchFields: IStayBookingTouchedPayload) => {
      const touchedData = touchFields;
      const passengerData = touchedData.passenger_details.map((passenger) => {
            return {
                  passenger_type: true,
                  first_name: true,
                  last_name: true,
                  dob: true,
                  gender: true,
                  title: true,
                  email: true,
                  phone_number: true,
                  number: true,
                  issuing_date: true,
                  expiry_date: true,
                  issuing_country: true,
                  nationality_country: true,
                  document_type: true,
                  holder: true
            }
      });
      touchedData.passenger_details = passengerData;
      return touchedData;
}


export const updateBookingData = (data: IStayBookingPayload, documentRequired: boolean): IStayBookingPayload => {
      const passenterDetails: IPassengerPayload[] = [];
      data.passenger_details.map((item) => (
            passenterDetails.push({
                  passenger_type: item.passenger_type,
                  first_name: item.first_name,
                  last_name: item.last_name,
                  dob: item.dob,
                  gender: item.gender,
                  title: item.title,
                  email: item.email,
                  phone_number: item.phone_number,
                  documents: documentRequired ? {
                      number: item.number || '',
                      issuing_date: item.issuing_date || '',
                      expiry_date: item.expiry_date || '',
                      issuing_country: item.issuing_country || '',
                      nationality_country: item.nationality_country || '',
                      document_type: item.document_type || '',
                      holder: parseBoolean(item.holder),
                  } : undefined,
            })
      ))
      return {
            contact_details: {
                c_first_name: data.contact_details.c_first_name,
                c_last_name: data.contact_details.c_last_name,
                c_email: data.contact_details.c_email,
                c_phone_number: data.contact_details.c_phone_number,
                c_relationship_to_p: data.contact_details.c_relationship_to_p
            },
            passenger_details: passenterDetails
      }
}