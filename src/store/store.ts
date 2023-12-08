import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import categoriesReducer from "./categoriesSlice";
import historyReducer from "./historySlice";
import selectedOrderReducer from "./selectedOrderSlice";
import ordersReducer from "./ordersSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    history: historyReducer,
    selectedOrder: selectedOrderReducer,
    orders: ordersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
