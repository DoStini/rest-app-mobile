import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Product from "../../src/components/products/Product";
import { formatPrice } from "../../src/config/helpers";
import useCategories from "../../src/hooks/useCategories";
import * as orderService from "../../src/services/orderService";

jest.mock("../../src/hooks/useCategories");

jest.mock("../../src/services/orderService", () => ({
  deleteProduct: jest.fn(),
  updateProduct: jest.fn(),
}));

describe("Product component", () => {
  const mockProduct = {
    name: "Test Product",
    price: 15,
    manual: "Product description goes here.",
    id: "123",
  };
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useCategories.mockReturnValue({
      refetch: jest.fn(),
      loading: false,
      error: null,
    });
  });

  it("renders correctly", () => {
    const { getByText } = render(
      <Product
        navigation={mockNavigation}
        route={{ params: { product: mockProduct } }}
      />
    );

    expect(getByText("Product details")).toBeTruthy();
    expect(getByText("Name:")).toBeTruthy();
    expect(getByText("Price:")).toBeTruthy();
    expect(getByText("Description:")).toBeTruthy();

    expect(getByText(`${mockProduct.name}`)).toBeTruthy();
    expect(getByText(`${formatPrice(mockProduct.price)}`)).toBeTruthy();
    expect(getByText(`${mockProduct.manual}`)).toBeTruthy();
  });

  it("navigates back to Products screen on header back button press", () => {
    const { getByTestId } = render(
      <Product
        navigation={mockNavigation}
        route={{ params: { product: mockProduct } }}
      />
    );

    const backButton = getByTestId("goBackButton");
    fireEvent.press(backButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Products");
  });

  it("calls deleteProduct on button press", async () => {
    const { getByText } = render(
      <Product
        navigation={mockNavigation}
        route={{ params: { product: mockProduct } }}
      />
    );

    const deleteButton = getByText("Delete product");
    fireEvent.press(deleteButton);

    // Verify deleteProduct was called with the correct product ID
    expect(orderService.deleteProduct).toHaveBeenCalledWith("123");
  });
});
