import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SystemInfo } from "../types/stack/state/System";
import * as service from "../services/system";

export const fetchTablesInfo = createAsyncThunk(
  "system/fetchTablesInfo",
  async () => {
    const data = await service.fetchTablesInfo();
    return data;
  }
);

const initialState: SystemInfo = {
  tablesInfo: {
    tables: [],
    status: "idle",
    error: null,
  },
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTablesInfo.pending, (state, action) => {
      state.tablesInfo.status = "loading";
    });
    builder.addCase(fetchTablesInfo.fulfilled, (state, action) => {
      state.tablesInfo.status = "succeeded";
      state.tablesInfo.tables = action.payload;
    });
    builder.addCase(fetchTablesInfo.rejected, (state, action) => {
      state.tablesInfo.status = "failed";
      state.tablesInfo.error =
        action.error.message ||
        "An unknown error occurred when fetching tables";
    });
  },
});

export default systemSlice.reducer;
