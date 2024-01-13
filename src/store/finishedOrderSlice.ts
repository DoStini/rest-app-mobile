import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as service from "../services/orderService";
import { FininshedOrderState } from "../types/StateTypes";

export const fetchPrintableOrder = createAsyncThunk(
  "orders/fetchPrintableOrder",
  async (orderId: string) => {
    const response = await service.fetchPrintableOrderById(orderId);
    return response;
  }
);

export const resetFinishedOrder = createAction("finishedOrder/reset");

const initialState: FininshedOrderState = {
  order: null,
  status: "idle",
  error: null,
};

const finishedOrderSlice = createSlice({
  name: "finishedOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrintableOrder.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPrintableOrder.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.order = action.payload;
    });
    builder.addCase(fetchPrintableOrder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || null;
    });
    builder.addCase(resetFinishedOrder, (state, action) => {
      state.order = initialState.order;
      state.status = initialState.status;
      state.error = initialState.error;
    });
  },
});

export default finishedOrderSlice.reducer;
