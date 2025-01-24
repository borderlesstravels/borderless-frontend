
import { getShortletList } from "../requests/request-shortlet-list";
import { call, put } from 'redux-saga/effects';
import { setShortlet } from "../../actions-reducers/shortlet-data";

export function* handleShortletList(): Generator<any>  {
    try{
        const shortletList: any = yield call(() => getShortletList());
        const { data } = shortletList.data;
        yield put(setShortlet(data));
    } catch(e){}
}
