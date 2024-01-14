import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Statistics as Statistics } from "../types/state/Statistics";
import * as service from "../services/statistics";

export const fetchStatistics = createAsyncThunk(
  "statistics/fetchMainStatistics",
  async () => {
    const data = await service.mainStatistics();
    return data;
  }
);

const initialState: Statistics = {
  main: [],
  status: "idle",
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatistics.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.main = action.payload;
    });
    builder.addCase(fetchStatistics.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message ||
        "An unknown error occurred when fetching statistics";
    });
  },
});

export default statisticsSlice.reducer;
