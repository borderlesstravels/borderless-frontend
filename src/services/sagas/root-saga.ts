import { takeLatest } from "redux-saga/effects";
import { GET_AIRPORTS } from "../actions-reducers/airport-list";
import { handleAirportList } from "./handlers/handle-airport-list";
import { GET_SHORTLETS } from "../actions-reducers/shortlet-data";
import { handleShortletList } from "./handlers/handle-shortlet-list";


export default function* rootSaga() {
    yield takeLatest(GET_AIRPORTS, handleAirportList);
    yield takeLatest(GET_SHORTLETS, handleShortletList);
}