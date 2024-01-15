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
export const fetchProductsStatistics = createAsyncThunk(
  "statistics/fetchProductsStatistics",
  async () => {
    const data = await service.productsStatistics();
    return data;
  }
);

const initialState: Statistics = {
  main: {
    status: "idle",
    statistics: [],
  },
  products: {
    statistics: {
      total: 0,
      products: [],
      categories: [],
    },
    status: "idle",
  },
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStatistics.pending, (state, action) => {
      state.main.status = "loading";
    });
    builder.addCase(fetchStatistics.fulfilled, (state, action) => {
      state.main.status = "succeeded";
      state.main.statistics = action.payload;
    });
    builder.addCase(fetchStatistics.rejected, (state, action) => {
      state.main.status = "idle";
    });

    builder.addCase(fetchProductsStatistics.pending, (state, action) => {
      state.products.status = "loading";
    });
    builder.addCase(fetchProductsStatistics.fulfilled, (state, action) => {
      state.products.status = "succeeded";
      state.products.statistics = action.payload;
    });
    builder.addCase(fetchProductsStatistics.rejected, (state, action) => {
      state.products.status = "idle";
    });
  },
});

export default statisticsSlice.reducer;
