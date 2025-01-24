
export interface IAirportData {
    city: string;
    city_code: string;
    country: string;
    iata_code: string;
    name: string;
}

export interface IShortletData {
    apartment_name: string;
    country: string;
    state: string;
    iata_code: string;
    lga: string;
    address: string;
    _id: string;
}

export interface IUserData {
    avatar?: string;
    email?: string;
    email_verified?: Boolean;
    first_name?: string;
    id: string;
    last_name?: string;
    userId?: string;
    userMode?: 'user' | 'host';
}

export interface iStoreState {
    user: any;
    airportList: IAirportData[];
    shortletList: IShortletData[];
}
