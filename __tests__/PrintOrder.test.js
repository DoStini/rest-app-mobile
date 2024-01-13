import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import PrintOrderPage from "../src/components/orders/active/PrintOrder";
import usePrintableorder from "../src/hooks/orders/usePrintableOrder";
import mockOrder from "./mocks/mockOrder.json";
import * as orderService from "../src/services/orderService";
import { printOrderById } from "../src/services/orderService";

jest.mock("../src/services/orderService");

jest.mock("../src/hooks/orders/usePrintableOrder", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("PrintOrderPage", () => {
  const mockNavigation = {
    goBack: jest.fn(),
    navigate: jest.fn(),
  };
  const mockRoute = {
    params: { id: "123" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading component when status is idle", () => {
    usePrintableorder.mockReturnValue({
      status: "idle",
      order: {},
      error: null,
    });
    const { getByTestId } = render(
      <PrintOrderPage navigation={mockNavigation} route={mockRoute} />
    );
    expect(getByTestId("loading-component")).toBeTruthy();
  });

  it("navigates back on error", () => {
    usePrintableorder.mockReturnValue({
      status: "idle",
      order: {},
      error: "error",
    });
    render(<PrintOrderPage navigation={mockNavigation} route={mockRoute} />);
    expect(mockNavigation.navigate).toHaveBeenCalledWith("OrderList");
  });

  it("renders order details on success", async () => {
    usePrintableorder.mockReturnValue({
      status: "success",
      order: mockOrder,
      error: null,
    });
    const { findByText } = render(
      <PrintOrderPage navigation={mockNavigation} route={mockRoute} />
    );

    await waitFor(() => {
      expect(findByText("testTable, testOrder")).toBeTruthy();
      expect(findByText("Responsible:")).toBeTruthy();
      expect(findByText("testCreator")).toBeTruthy();
      expect(findByText("Print Order")).toBeTruthy();
      expect(findByText("testOrderProduct")).toBeTruthy();
      expect(findByText("Confirm and order")).toBeTruthy();
    });
  });

  it("submits the order when 'Confirm and order' button is pressed", async () => {
    printOrderById.mockResolvedValueOnce();
    usePrintableorder.mockReturnValue({
      status: "success",
      order: mockOrder,
      error: null,
    });

    const { getByText } = render(
      <PrintOrderPage navigation={mockNavigation} route={mockRoute} />
    );

    fireEvent.press(getByText("Confirm and order"));

    await waitFor(() => {
      expect(printOrderById).toHaveBeenCalledWith(mockRoute.params.id, [
        { amount: 0, productId: 1 },
        { amount: 0, productId: 2 },
      ]);
    });
  });
});
