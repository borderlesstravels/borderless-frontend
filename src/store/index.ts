import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { userAuthApi } from "./apis/user-auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import { hostAuthApi } from "./apis/host-auth";
import { contactApi } from "./apis/contact";
import { flightsApi } from "./apis/flights";
import { paymentsApi } from "./apis/payments";
import { shortletsApi } from "./apis/shortlets";
import { userProfileSettingsApi } from "./apis/user-profile-settings";
import { userDashboardAuthApi } from "./apis/user-dashboard-auth";
import { userBookingsApi } from "./apis/user-bookings";
import { hostProfileSettingsApi } from "./apis/host-profile-settings";
import userReducer, { USER_FEATURE_KEY } from "./features/user";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  [USER_FEATURE_KEY]: userReducer,
  [userAuthApi.reducerPath]: userAuthApi.reducer,
  [hostAuthApi.reducerPath]: hostAuthApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [flightsApi.reducerPath]: flightsApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
  [shortletsApi.reducerPath]: shortletsApi.reducer,
  [userProfileSettingsApi.reducerPath]: userProfileSettingsApi.reducer,
  [userDashboardAuthApi.reducerPath]: userDashboardAuthApi.reducer,
  [userBookingsApi.reducerPath]: userBookingsApi.reducer,
  [hostProfileSettingsApi.reducerPath]: hostProfileSettingsApi.reducer,
});

const persistConfig = {
  version: 1,
  key: "root",
  storage,
  whitelist: [USER_FEATURE_KEY],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(userAuthApi.middleware)
      .concat(hostAuthApi.middleware)
      .concat(contactApi.middleware)
      .concat(flightsApi.middleware)
      .concat(paymentsApi.middleware)
      .concat(shortletsApi.middleware)
      .concat(userProfileSettingsApi.middleware)
      .concat(userDashboardAuthApi.middleware)
      .concat(userBookingsApi.middleware)
      .concat(hostProfileSettingsApi.middleware),
});

export const persistor = persistStore(store);

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
