

export interface iStrictAddress {
    address?: string;
    apartment_name?: string;
    country: string;
    lga: string;
    state: string;
    _id?: string;
}
export interface ILocationData {
    address: any;
    geolocation: any;
}

export interface IStrictLocationData {
    address: iStrictAddress | undefined;
    geolocation: any;
}

export interface IDateData {
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string | undefined;
}

export interface ICombinedStaySearchData {
    location: ILocationData | undefined;
    date: IDateData | undefined;
}

export interface IStrictStaySearchData {
    location: IStrictLocationData | undefined;
    date: IDateData | undefined;
}

export let storedCombinedStayData: ICombinedStaySearchData = {
    location: {address: undefined, geolocation: undefined},
    date: { startDate: undefined, endDate: undefined, key: 'selection' },
}

export const generateNewCombinedStayData = (): ICombinedStaySearchData => {
    return {
        location: {address: undefined, geolocation: undefined},
        date: { startDate: undefined, endDate: undefined, key: 'selection' },
    }
}

export const updateCombinedStayData = (data: ICombinedStaySearchData) => {
    storedCombinedStayData = data;
}