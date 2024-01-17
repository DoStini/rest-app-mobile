import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as service from "../services/system";
import * as authService from "../services/auth";
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

export const fetchAuth = createAsyncThunk("system/fetchAuth", async () => {
  const data = await authService.me();
  return data;
});

export const login = createAsyncThunk(
  "system/login",
  async (payload: { email: string; password: string }) => {
    const data = await authService.login(payload.email, payload.password);
    return data;
  }
);

export const logout = createAsyncThunk("system/logout", async () => {
  await authService.logout();
});

const initialState: SystemInfo = {
  tablesInfo: {
    tables: [],
    status: "idle",
    error: null,
  },
  snackbar: null,
  auth: {
    user: null,
    loading: true,
    error: false,
    fetchingLogin: false,
    errorLogin: false,
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

    builder.addCase(openSnackbar, (state, action) => {
      state.snackbar = action.payload.message;
    });

    builder.addCase(closeSnackbar, (state, action) => {
      state.snackbar = null;
    });

    // Auth actions

    builder.addCase(fetchAuth.pending, (state, action) => {
      state.auth.loading = true;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.auth.loading = false;
      state.auth.user = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.auth.loading = false;
      state.auth.error = true;
    });

    builder.addCase(login.pending, (state, action) => {
      state.auth.fetchingLogin = true;
      state.auth.errorLogin = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.auth.fetchingLogin = false;
      state.auth.errorLogin = false;
      state.auth.loading = false;
      state.auth.error = false;
      state.auth.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.auth.fetchingLogin = false;
      state.auth.errorLogin = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.auth.user = null;
      state.auth.error = true;
    });
  },
});

export default systemSlice.reducer;
