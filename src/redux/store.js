import { configureStore } from "@reduxjs/toolkit";
import { setupAxiosInterceptors, setAuthHeader } from "./auth/operations.js";
import authReducer from "./auth/slice.js";
import domainReducer from "./domens/slice.js";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "user", "isLoggedIn"],
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        domain: domainReducer,
    },
    middleware: (gDM) =>
        gDM({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// const token = store.getState().auth.token;
// if (token) setAuthHeader(token);

setupAxiosInterceptors(store);

export const persistor = persistStore(store);

persistor.subscribe(() => {
    const token = store.getState().auth.token;
    if (token) setAuthHeader(token);
});
