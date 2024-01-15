import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Products from "../../src/components/products/Products";
import mockCategories from "../mocks/mockCategories.json";
import useCategories from "../../src/hooks/useCategories";

jest.mock("../../src/hooks/useCategories", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("Products component", () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  it("renders loading component when status is loading", () => {
    useCategories.mockReturnValue({
      status: "loading",
      categories: [],
      error: null,
    });
    const { getByTestId } = render(<Products navigation={mockNavigation} />);
    expect(getByTestId("loading-component")).toBeTruthy();
  });

  it("renders correctly", async () => {
    useCategories.mockReturnValue({
      status: "success",
      categories: mockCategories,
      error: null,
    });
    const { getByText, getByPlaceholderText } = render(
      <Products navigation={mockNavigation} />
    );

    await waitFor(() => {
      expect(getByText("Products")).toBeTruthy();
      expect(getByPlaceholderText("Search for a product...")).toBeTruthy();
      expect(getByText("Food")).toBeTruthy();
      expect(getByText("Pizza")).toBeTruthy();
      expect(getByText("12.99 €")).toBeTruthy();
      expect(getByText("Burger")).toBeTruthy();
      expect(getByText("8.99 €")).toBeTruthy();
    });
  });

  it("navigates to NewProduct screen on + icon press", () => {
    useCategories.mockReturnValue({
      status: "success",
      categories: mockCategories,
      error: null,
    });
    const { getByTestId } = render(<Products navigation={mockNavigation} />);

    const addButton = getByTestId("addProductButton");
    fireEvent.press(addButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("NewProduct", {
      categories: mockCategories,
    });
  });

  it("navigates to Product screen on product press", () => {
    useCategories.mockReturnValue({
      status: "success",
      categories: mockCategories,
      error: null,
    });
    const { getByText } = render(<Products navigation={mockNavigation} />);

    const productItem = getByText(mockCategories[0].products[0].name);
    fireEvent.press(productItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Product", {
      product: mockCategories[0].products[0],
      categoryName: mockCategories[0].name,
    });
  });
});
