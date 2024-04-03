
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./features/auth-slice";
import transactionReducer from "./features/transaction-slice";

export const store = configureStore({
  reducer: {
    authReducer,
    transactionReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;