import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CategoriesState } from "../types/StateTypes";
import { fetchCategories as fetchCategoriesApi } from "../services/orderService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const categories = await fetchCategoriesApi();
    return categories;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  } as CategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "An unknown error occurred";
    });
  },
});

export default categoriesSlice.reducer;
