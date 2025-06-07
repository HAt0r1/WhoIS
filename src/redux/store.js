import {configureStore} from "@reduxjs/toolkit";
import {setupAxiosInterceptors} from "./auth/operations.js";
import authReducer from "auth/slice.js";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

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
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

setupAxiosInterceptors(store);

export const persistor = persistStore(store);