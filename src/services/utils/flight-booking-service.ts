export interface ILocationData {
    from: any;
    to: any;
}

export interface IDateData {
    startDate: Date | undefined;
    endDate: Date | undefined;
    key: string | undefined;
}

export interface ILaugageData {
    checkedInCount: number;
    handLuggageCount: number;
}

export interface IFlightClassData {
    adultCount: number;
    childrenCount: number;
    infantCount: number;
    cabinClass: 'Economy' | 'Premium' | 'Business' | 'First';
    allPassengerCount: number;
  }

export interface ICombinedFlightSearchData {
    location: ILocationData | undefined;
    date: IDateData | undefined;
    flightClass: IFlightClassData | undefined;
    flightType: 'return' | 'one-way';
}

export let storedCombinedFlightData: ICombinedFlightSearchData = {
    location: {from: undefined, to: undefined},
    date: { startDate: undefined, endDate: undefined, key: 'selection' },
    flightClass: undefined,
    flightType: 'return',
}

export const generateNewCombinedFlightData = (): ICombinedFlightSearchData => {
    return {
        location: {from: undefined, to: undefined},
        date: { startDate: undefined, endDate: undefined, key: 'selection' },
        flightClass: undefined,
        flightType: 'return',
    }
}

export const updateCombinedFlightData = (data: ICombinedFlightSearchData) => {
    storedCombinedFlightData = data;
}