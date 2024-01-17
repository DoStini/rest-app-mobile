import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as service from "../services/system";
import { SystemInfo } from "../types/state/System";

export const fetchTablesInfo = createAsyncThunk(
  "system/fetchTablesInfo",
  async () => {
    const data = await service.fetchTablesInfo();
    return data;
  }
);

export const openSnackbar = createAction(
  "system/openSnackbar",
  (message: string) => ({
    payload: {
      message,
    },
  })
);

export const closeSnackbar = createAction("system/closeSnackbar");

const initialState: SystemInfo = {
  tablesInfo: {
    tables: [],
    status: "idle",
    error: null,
  },
  snackbar: null,
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

    builder.addCase(openSnackbar, (state, action) => {
      state.snackbar = action.payload.message;
    });

    builder.addCase(closeSnackbar, (state, action) => {
      state.snackbar = null;
    });
  },
});

export default systemSlice.reducer;
