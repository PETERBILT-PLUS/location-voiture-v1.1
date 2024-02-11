import { createSlice } from "@reduxjs/toolkit";
//import Data from "../Components/Data";

const initialState = {
    currentUser: null,
    error: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.currentUser = action.payload.userExist;
            state.error = action.payload.message;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = null;
        }
    },
});

export const { loginUser, loginFailure, logout } = userSlice.actions;
export default userSlice;