import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiInstance} from "../auth/operations.js";



export const searchDomain = createAsyncThunk(
    "domain/search",
    async (domainName, thunkAPI) => {
        console.log("Auth header:", apiInstance.defaults.headers.common.Authorization);
        try {
            const response = await apiInstance.post("/domain/search", { domain: domainName });
            return response.data;
        } catch (error) {
            console.error("Search error:", error.response?.data || error.message);
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);