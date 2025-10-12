import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { api } from "./store/services/api";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: import.meta.env.MODE !== "production",
});
