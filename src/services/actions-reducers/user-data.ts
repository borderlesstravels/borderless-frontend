export const GET_USER_LOGIN = 'GET_USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export const userLogin = (payload: any) => {
    return {
        type: GET_USER_LOGIN,
        payload
    }
}
export const userLogout = () => {
    return {
        type: USER_LOGOUT,
    }
}

export const userReducer = (state = {}, action: any) => {
    switch(action.type) {
        case GET_USER_LOGIN:
            return {...state, ...action.payload};
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
}
export default userReducer;