import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersState } from "../types/StateTypes";
import { fetchOrders as fetchOrdersApi } from "../services/orderService";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const orders = await fetchOrdersApi();
  return orders;
});

const initialState: OrdersState = {
  tables: null,
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      if (state.tables === null) {
        state.status = "loading";
      } else {
        state.status = "revalidating";
      }
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.tables = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message ||
        "An unknown error occurred when fetching orders";
    });
  },
});

export default orderSlice.reducer;
