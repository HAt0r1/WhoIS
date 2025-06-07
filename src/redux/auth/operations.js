
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setToken } from "./slice";

export const apiInstance = axios.create({
    baseURL: "https://whois-backend.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const setAuthHeader = (token) => {
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
    apiInstance.defaults.headers.common["Authorization"] = "";
};

export const setupAxiosInterceptors = (store) => {
    apiInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (
                error.response?.status === 401 &&
                !originalRequest._retry
            ) {
                originalRequest._retry = true;
                try {
                    const response = await apiInstance.post("/auth/refresh");
                    const accessToken = response.data.data.accessToken;
                    setAuthHeader(accessToken);
                    store.dispatch(setToken({ token: accessToken }));
                    originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
                    return apiInstance(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }
            return Promise.reject(error);
        }
    );
};

export const signUp = createAsyncThunk("auth/signup", async (newUser, thunkAPI) => {
    try {
        const response = await apiInstance.post("/auth/register", newUser);
        setAuthHeader(response.data.data.accessToken);
        return response.data.data;
    } catch (error) {
        toast.error(`Sign Up error: ${error.message}`);
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signIn = createAsyncThunk("auth/signin", async (user, thunkAPI) => {
    try {
        const response = await apiInstance.post("/auth/login", user);
        setAuthHeader(response.data.data.accessToken);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const signOut = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
    try {
        await apiInstance.post("/auth/logout");
        clearAuthHeader();
    } catch (error) {
        clearAuthHeader();
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
    try {
        const response = await apiInstance.post("/auth/refresh");
        setAuthHeader(response.data.data.accessToken);
        thunkAPI.dispatch(setToken({ token: response.data.data.accessToken }));
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});