
import { getAirportList } from "../requests/request-airport-list";
import { call, put } from 'redux-saga/effects';
import { setAirport } from "../../actions-reducers/airport-list";

export function* handleAirportList(): Generator<any>  {
    try{
        const airportList: any = yield call(() => getAirportList());
        const { data } = airportList.data;
        yield put(setAirport(data));
    } catch(e){}
}
