import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from  "redux-saga";
import rootSaga from "./sagas/root-saga";
import {userReducer} from "./actions-reducers/user-data";
import airportListReducer from "./actions-reducers/airport-list";
import shortletListReducer from "./actions-reducers/shortlet-data";

const combinedReducers: any = combineReducers({
    user: userReducer,
    airportList: airportListReducer,
    shortletList: shortletListReducer,
});

const config = {
    whitelist: ['user'],
    key: 'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(config, combinedReducers);

const saggaMiddleware = createSagaMiddleware();
const middlewares = [saggaMiddleware];

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(...middlewares),
});

export const persistor = persistStore(store)

// export const persistor = persistStore(store);

saggaMiddleware.run(rootSaga);