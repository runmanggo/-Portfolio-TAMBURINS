import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["cart"],
};

//리듀서 스토리지에 저장
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 리덕스 스토어에 저장
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

// persistStore 함수를 사용하여 스토어를 영구적 저장
export const persistor = persistStore(store);
