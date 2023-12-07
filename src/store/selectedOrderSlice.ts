import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SelecterOrderState } from "../types/StateTypes";
import { fetchOrderById as fetchOrderById } from "../services/orderService";

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId: string) => {
    const response = await fetchOrderById(orderId);
    return response;
  }
);

const initialState: SelecterOrderState = {
  selectedOrder: null,
  status: "idle",
  error: null,
};

const selectedOrderSlice = createSlice({
  name: "selectedOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedOrder = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message ||
        "An unknown error occurred when fetching history";
    });
  },
});

export default selectedOrderSlice.reducer;
