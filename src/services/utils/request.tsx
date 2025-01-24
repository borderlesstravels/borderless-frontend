import axios from 'axios';
import { apiLinks } from '../../config/environment';
import { IPromiseRequestFormat, IrequestFormat } from '../constants/interfaces/request-schema';
import { routeConstants } from '../constants/route-constants';

export const sendRequest = (params: IrequestFormat, success: Function, failure: Function) => {
    const request = params.external ? axios.create({}) : axios.create({ baseURL: apiLinks.url });
    request.interceptors.request.use((req: any) => {
    
        if(params.header) {
            req.headers = params.header
        }
        const token = sessionStorage.getItem('token');
        if(token) {
            req.headers['x-access-token'] = token;
        }
        return req 
    })
    return request(params.url,{
        method: params.method || 'GET',
        data: params.body,
        withCredentials: true,
    })
    .then((result) => success(result?.data))
    .catch(error => {

        const errorStatus = error?.request?.status;

        // if((errorStatus === 401 || errorStatus === 403) && params.catchAuthError) {
        //     sessionStorage.clear();
        //     setTimeout(() => {
        //         window.location.href = `/${routeConstants.login}`;
        //     }, 500);
        //     params.catchAuthError();
        //     return
        // }
        return failure(error.response?.data);
    });
}

// export const logOut = () => {
  
//   sendRequest(
//     {
//       url: userType === 'user' ? 'user-auth/logout' : 'host-profile/logout',
//       method: "POST",
//       body: {},
//     },
//     () => {
//       dispatch(userLogout());
//       navigateTo(`${routeConstants.home}`);
//     },
//     () => {
//       dispatch(userLogout());
//       navigateTo(`${routeConstants.home}`);
//     }
//   );
// }

export const sendPromiseRequest = (params: IPromiseRequestFormat) : {request: Promise<any>, errorHandler: Function } => {
    const request = params.external ? axios.create({}) : axios.create({ baseURL: apiLinks.url });
    request.interceptors.request.use((req: any) => {
    
        if(params.header) {
            req.headers = params.header
        }
        const token = sessionStorage.getItem('token');
        if(token) {
            req.headers['x-access-token'] = token;
        }
        return req 
    })
    return {
        request: request(params.url,{
            method: params.method || 'GET',
            data: params.body,
        }),
        errorHandler: (error: any, failure: Function) => {
    
            const errorStatus = error.request?.status;
    
            if(errorStatus === 401 || errorStatus === 403) {
                sessionStorage.clear();
                console.log('Something going ons');
                setTimeout(() => {
                    window.location.href = `/${routeConstants.login}`;
                }, 500);
                return
            }
            return failure(error.response?.data);
        }
    }
}