import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, UserState } from "../../types/types";

const initialState: UserState = {
  name: "",
  username: "",
  logged: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    login: (user: UserState, action: PayloadAction<UserInfo>) => ({
      ...action.payload,
      logged: true,
    }),
    logout: () => ({ name: "", username: "", logged: false }),
  },
});

export const { login: logInActionCreator, logout: logOutActionCreator } =
  userSlice.actions;

export default userSlice.reducer;