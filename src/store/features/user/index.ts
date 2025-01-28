import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../types";
import { RootState } from "../..";

export const USER_FEATURE_KEY = "user";

export interface UserState {
  user: Api.General.User | null;
  mode: Api.General.UserMode | null;
}

const initialState: UserState = {
  user: null,
  mode: null,
};

export const userSlice = createSlice({
  name: USER_FEATURE_KEY,
  initialState,
  reducers: {
    handleLogin: (
      state,
      action: PayloadAction<{
        user: Api.General.User;
        mode: Api.General.UserMode;
      }>
    ) => {
      state.user = action.payload.user;
      state.mode = action.payload.mode;
    },
    handleUserMode: (state, action: PayloadAction<Api.General.UserMode>) => {
      state.mode = action.payload;
    },
    handleLogout: (state) => {
      state.user = null;
      state.mode = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { handleLogin, handleLogout, handleUserMode } = userSlice.actions;

export const selectUser = createSelector(
  (state: RootState) => state.user.user,
  (user) => user
);
export const selectUserMode = createSelector(
  (state: RootState) => state.user.mode,
  (mode) => mode
);

export default userSlice.reducer;
