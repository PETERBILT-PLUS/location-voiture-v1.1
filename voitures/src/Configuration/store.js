import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api.js";
import userSlice from "./main.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


const rootReducer = combineReducers({ user: userSlice.reducer });

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const myStore = configureStore({
    reducer: {
        user: persistedReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(api.middleware)
});

export const persistor = persistStore(myStore);

export default myStore;