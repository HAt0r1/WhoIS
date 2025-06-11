import { createAsyncThunk } from "@reduxjs/toolkit";
import {apiInstance} from "../auth/operations.js";



export const searchDomain = createAsyncThunk(
    "domain/search",
    async (domainName, thunkAPI) => {
        try {
            const response = await apiInstance.post("/domain/search", { domain: domainName });
            console.log("Headers:", apiInstance.defaults.headers.common);
            console.log("Response:", response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);