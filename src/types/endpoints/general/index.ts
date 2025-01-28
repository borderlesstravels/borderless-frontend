export namespace General {
  export interface SuccessResponse {
    success: boolean;
    message: string;
  }

  export type UserMode = "user" | "host";

  export interface User {
    first_name: string;
    last_name: string;
    email: string;
    id: string;
    email_verified: boolean;
    avatar?: string;
  }

  export interface Outbound {
    baggage: string;
    marketing_airline: string;
    layover: number;
    airport_to: string;
    fare_rules: [];
    marriage_group: null;
    cabin_type: string;
    operating_airline: string;
    overnight: boolean;
    airport_from: string;
    arrival_time: string;
    departure_time: string;
    booking_class: string;
    refundable: boolean;
    equipment_type: string;
    duration: number;
    airline_details: {
      logo: string;
      name: string;
      code: string;
    };
    flight_number: string;
    airport_from_details: {
      name: string;
      city: string;
      city_code: string;
      iata_code: string;
      country: string;
      country_code: string;
    };
    airport_to_details: {
      name: string;
      city: string;
      city_code: string;
      iata_code: string;
      country: string;
      country_code: string;
    };
  }

  export interface PassengerDetail {
    passenger_type: string;
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    title: string;
    email: string;
    phone_number: string;
    documents?: {
      number: string;
      issuing_date: string;
      expiry_date: string;
      issuing_country: string;
      nationality_country: string;
      document_type: string;
      holder: boolean;
    };
    number?: string;
    issuing_date?: string;
    expiry_date?: string;
    issuing_country?: string;
    nationality_country?: string;
    document_type?: string;
    holder?: string;
  }

  export interface PriceSummary {
    passenger_type: string;
    total_price: number;
    quantity: number;
  }

  export interface Pricing {
    payable: number;
    markup: {
      markup_type: string;
      markup_value: number;
    };
  }

  export type TravelerPrice = Record<string, number>;

  export interface Ticket {
    status: string;
    ticket_number: number[];
    traveler: string;
  }

  export interface Flight {
    id: string;
    amount: number;
    bookable_seats: number;
    booking_account: string;
    created_at: string;
    currency: string;
    document_required: null;
    expires_at: string;
    fare_basis: string;
    inbound: [];
    inbound_stops: number;
    is_multicity: boolean;
    issue_account: null;
    outbound: Outbound[];
    outbound_stops: number;
    passengers: PassengerDetail[];
    pnr: null;
    price_change: boolean;
    price_summary: PriceSummary[];
    pricing: Pricing;
    reference: string;
    status: string;
    tickets: Ticket[];
    total_duration: number;
    total_inbound_duration: number;
    total_outbound_duration: number;
    travelers_price: TravelerPrice[];
  }

  export interface Shortlet {
    _id: string;
    owner: string;
    apartment_name: string;
    country: string;
    state: string;
    lga: string;
    address: string;
    email: string;
    phone: string;
    website: string;
    images: string;
    single: number;
    suites: number;
    executive: number;
    double_chambers: number;
    description: string;
    bedrooms: number;
    bathrooms: number;
    parking: number;
    pool: number;
    bathtube: boolean;
    bidet: boolean;
    body_soap: boolean;
    cleaning_products: boolean;
    hot_water: boolean;
    bed_linens: boolean;
    clothing_storage: boolean;
    drying_rack: boolean;
    essentials: boolean;
    extra_pillows: boolean;
    free_dryer: boolean;
    free_washer: boolean;
    hangers: boolean;
    iron: boolean;
    darkening_shades: boolean;
    archade_games: boolean;
    bluetooth: boolean;
    reading: boolean;
    game_console: boolean;
    ping_pong_table: boolean;
    pool_table: boolean;
    tv: boolean;
    ac: boolean;
    fans: boolean;
    monoxide_alarm: boolean;
    fire_extinguisher: boolean;
    first_aid_kit: boolean;
    security_cameras: boolean;
    smoke_alarm: boolean;
    dedicated_workspace: boolean;
    wifi: boolean;
    bbq_grill: boolean;
    outdoor_dining: boolean;
    outdoor_furniture: boolean;
    patio_balcony: boolean;
    backyard_fenced: boolean;
    carpot: boolean;
    street_parking: boolean;
    private_pool: boolean;
    lockbox: boolean;
    self_checkin: boolean;
    createdAt: string;
    __v: number;
  }

  export interface FlightBooking {
    _id: string;
    owner: string;
    client_name: string;
    client_phone: string;
    client_email: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_relationship: string;
    airline: string;
    airline_logo: string;
    departure_time: string;
    arrival_time: string;
    origin_code: string;
    destination_code: string;
    origin: string;
    destination: string;
    price: number;
    status: string;
    payment_status: string;
    booking_reference: string;
    created_at: string;
    __v: number;
  }

  export interface ShortletBooking {
    _id: string;
    owner: string;
    apartment_id: string;
    apartment_name: string;
    apartment_img: string;
    apartment_address: string;
    apartment_city: string;
    apartment_state: string;
    apartment_country: string;
    apartment_owner: string;
    name: string;
    email: string;
    phone: string;
    check_in_date: string;
    check_out_date: string;
    check_in_time: string;
    check_out_time: string;
    price: number;
    status: string;
    payment_status: string;
    booking_reference: string;
    created_at: string;
    __v: number;
  }
}
