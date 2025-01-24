
export const GET_SHORTLETS = 'GET_SHORTLETS';
export const SET_SHORTLETS = 'SET_SHORTLETS';
export const GETSHORTLETDATE = 'GETSHORTLETDATE';

export const getShortlet = () => {
    return {
        type: GET_SHORTLETS,
    }
}

export const setShortlet = (payload: any) => {
    return {
        type: SET_SHORTLETS,
        payload
    }
}

export const getShortletDate = (payload: any) => {
    return {
        type: GETSHORTLETDATE,
        payload
    }
}

const shortletListReducer = (state = [], action: any) => {
    switch(action.type) {
        case SET_SHORTLETS:
            return [...action.payload];
        default:
            return state;
    }
}

export default shortletListReducer;