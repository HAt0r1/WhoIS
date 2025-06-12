import { createSlice } from "@reduxjs/toolkit";
import {searchDomain} from "./operations.js";

const initialState = {
    result: null,
    isLoading: false,
    error: null,
};

const domainSlice = createSlice({
    name: "domain",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchDomain.pending, (state) => {
                state.isLoading = true;
                state.result = null;
                state.error = null;
            })
            .addCase(searchDomain.fulfilled, (state, action) => {
                state.isLoading = false;
                state.result = action.payload;
            })
            .addCase(searchDomain.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Search failed";
            });
    },
});

export default domainSlice.reducer;
