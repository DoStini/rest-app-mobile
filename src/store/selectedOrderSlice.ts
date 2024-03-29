import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { SelecterOrderState } from "../types/StateTypes";
import * as service from "../services/orderService";

export const fetchOrder = createAsyncThunk(
  "orders/fetchOrder",
  async (orderId: string) => {
    const response = await service.fetchOrderById(orderId);
    return response;
  }
);

export const fetchOrderWithProducts = createAsyncThunk(
  "orders/fetchOrderProducts",
  async (orderId: string) => {
    const response = await service.fetchOrderByIdWithProducts(orderId);
    return response;
  }
);

export const deleteOrderProduct = createAsyncThunk(
  "orders/deleteOrderProduct",
  async ({ orderId, productId }: { orderId: string; productId: string }) => {
    const response = await service.updateOrderProduct(orderId, productId, 0);
    return response;
  }
);

export const updateComment = createAction(
  "orders/updateComment",
  function prepare(productId: string, comment: string) {
    return {
      payload: {
        productId,
        comment,
      },
    };
  }
);

export const updateOrderProduct = createAsyncThunk(
  "orders/updateOrderProduct",
  async ({
    orderId,
    productId,
    amount,
  }: {
    orderId: string;
    productId: string;
    amount: number;
  }) => {
    const response = await service.updateOrderProduct(
      orderId,
      productId,
      amount
    );
    return response;
  }
);

export const resetOrderState = createAction("orders/resetOrderState");

const initialState: SelecterOrderState = {
  selectedOrder: null,
  status: "idle",
  updateStatus: "idle",
  error: null,
};

const selectedOrderSlice = createSlice({
  name: "selectedOrder",
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetOrderState, (state, action) => {
      state.selectedOrder = initialState.selectedOrder;
      state.status = initialState.status;
      state.updateStatus = initialState.updateStatus;
      state.error = initialState.error;
    });

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
        "An unknown error occurred when fetching history for this order.";
    });

    builder.addCase(fetchOrderWithProducts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrderWithProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.selectedOrder = action.payload;
    });
    builder.addCase(fetchOrderWithProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error =
        action.error.message ||
        "An unknown error occurred when fetching history for this order.";
    });

    builder.addCase(deleteOrderProduct.pending, (state, action) => {
      state.updateStatus = "loading";
      const productIndex = state.selectedOrder?.OrderProduct.findIndex(
        (row) => String(row.productId) === action.meta.arg.productId
      );
      if (productIndex !== undefined) {
        state.selectedOrder?.OrderProduct.splice(productIndex, 1);
      }
    });
    builder.addCase(deleteOrderProduct.fulfilled, (state, action) => {
      state.updateStatus = "idle";
    });
    builder.addCase(deleteOrderProduct.rejected, (state, action) => {
      state.updateStatus = "idle";
      state.error =
        action.error.message ||
        "An unknown error occurred when deleting this order.";
    });

    builder.addCase(updateOrderProduct.pending, (state, action) => {
      state.updateStatus = "loading";
    });
    builder.addCase(updateOrderProduct.fulfilled, (state, action) => {
      state.updateStatus = "idle";
    });
    builder.addCase(updateOrderProduct.rejected, (state, action) => {
      state.updateStatus = "idle";
      state.error =
        action.error.message ||
        "An unknown error occurred when updating this order.";
    });

    builder.addCase(updateComment, (state, action) => {
      state.updateStatus = "idle";
      const index = state.selectedOrder?.OrderProduct.findIndex(
        (row) => String(row.productId) === action.payload.productId
      );
      if (
        index === undefined ||
        index === -1 ||
        !state.selectedOrder?.OrderProduct[index]
      )
        return;

      state.selectedOrder.OrderProduct[index].comment = action.payload.comment;
    });
  },
});

export const { clearSelectedOrder } = selectedOrderSlice.actions;

export default selectedOrderSlice.reducer;
