export const GET_AIRPORTS = 'GET_AIRPORTS';
export const SET_AIRPORTS = 'SET_AIRPORTS';

export const getAirport = () => {
    return {
        type: GET_AIRPORTS,
    }
}

export const setAirport = (payload: any) => {
    return {
        type: SET_AIRPORTS,
        payload
    }
}

const airportListReducer = (state = [], action: any) => {
    switch(action.type) {
        case SET_AIRPORTS:
            return [...action.payload];
        default:
            return state;
    }
}

export default airportListReducer;
