import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OrdersState } from "../types/StateTypes";
import { fetchOrders as fethOrdersApi } from "../services/orderService";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const orders = await fethOrdersApi();
  return orders;
});

const initialState: OrdersState = {
  items: [],
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
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
