import {createSlice} from "@reduxjs/toolkit";

import {signIn, signOut, signUp, refresh } from "./operations.js";

const initialState = {
    user: {
        phone: null,
        countryCode: null,
        role: null,
        _id: null,
    },
    token: null,
    isLoading: false,
    isLoggedIn: false,
    isRefreshing: false,
    isError: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload.token;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = action.payload.accessToken;
                state.user = action.payload.user;
            })
            .addCase(signUp.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.token = action.payload.accessToken;
                state.user = action.payload.user;
            })
            .addCase(signIn.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.token = null;
                state.user = initialState.user;
                state.isLoggedIn = false;
                state.isError = false;
            })
            .addCase(refresh.pending, (state) => {
                state.isRefreshing = true;
                state.isError = false;
            })
            .addCase(refresh.fulfilled, (state, action) => {
                state.isRefreshing = false;
                state.isLoggedIn = true;
                state.token = action.payload.accessToken;
            })
            .addCase(refresh.rejected, (state) => {
                state.isRefreshing = false;
                state.isLoggedIn = false;
                state.token = null;
                state.user = null;
            })
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
