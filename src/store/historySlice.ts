import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HistoryState } from "../types/StateTypes";
import { fetchHistory as fetchHistoryApi } from "../services/orderService";

export const fetchHistory = createAsyncThunk(
  "orders/fetchHistory",
  async () => {
    const history = await fetchHistoryApi();
    return history;
  }
);

const initialState: HistoryState = {
  items: [],
  status: "idle",
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHistory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchHistory.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchHistory.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message ||
        "An unknown error occurred when fetching order history";
    });
  },
});

export default historySlice.reducer;
