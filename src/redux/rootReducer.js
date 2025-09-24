import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./store/slices/authSlice";
import { api } from "./store/services/api";

const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
});

export default rootReducer;
