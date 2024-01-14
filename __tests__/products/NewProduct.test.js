import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import NewProduct from "../../src/components/products/NewProduct";
import useCategories from "../../src/hooks/useCategories";
import { createProduct } from "../../src/services/orderService";

jest.mock("../../src/hooks/useCategories");
jest.mock("../../src/services/orderService");

describe("NewProduct component", () => {
  // Mock navigation parameters
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const categories = [
    { id: 1, name: "Category1" },
    { id: 2, name: "Category2" },
  ];
  const mockCreateProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useCategories.mockReturnValue({
      refetch: jest.fn(),
      loading: false,
      error: null,
    });
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <NewProduct
        navigation={mockNavigation}
        route={{ params: { categories } }}
      />
    );

    // Check if important text and input elements are present
    expect(getByText("Product name")).toBeTruthy();
    expect(getByPlaceholderText("Name for the product")).toBeTruthy();
    expect(getByText("Price")).toBeTruthy();
    expect(getByPlaceholderText("Price in euros (€)")).toBeTruthy();
    expect(getByText("Category")).toBeTruthy();
  });

  it("handles input changes correctly", async () => {
    const { getByPlaceholderText } = render(
      <NewProduct
        navigation={mockNavigation}
        route={{ params: { categories } }}
      />
    );

    const nameInput = getByPlaceholderText("Name for the product");
    const priceInput = getByPlaceholderText("Price in euros (€)");

    fireEvent.changeText(nameInput, "Test Product");
    fireEvent.changeText(priceInput, "15");

    await waitFor(() => {
      expect(nameInput.props.value).toBe("Test Product");
      expect(priceInput.props.value).toBe("15");
    });
  });

  it("displays error messages for empty inputs on form submission", async () => {
    const { getByText } = render(
      <NewProduct
        navigation={mockNavigation}
        route={{ params: { categories } }}
      />
    );
    fireEvent.press(getByText("Create"));

    await waitFor(() => {
      expect(getByText("Product name is required")).toBeTruthy();
      expect(getByText("Product price is required")).toBeTruthy();
      expect(getByText("Category is required")).toBeTruthy();
    });
  });

  it("navigates back to Products screen on header back button press", () => {
    const { getByTestId } = render(
      <NewProduct
        navigation={mockNavigation}
        route={{ params: { categories } }}
      />
    );

    const backButton = getByTestId("goBackButton");
    fireEvent.press(backButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith("Products");
  });

  // The dropdown picker is not working properly in the test environment. Need to mock it
  /*it("calls the create function with valid input", async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <NewProduct
        navigation={mockNavigation}
        route={{ params: { categories } }}
      />
    );

    fireEvent.changeText(
      getByPlaceholderText("Name for the product"),
      "Test Product"
    );
    fireEvent.changeText(getByPlaceholderText("Price in euros (€)"), "15");

    fireEvent.press(getByText("Create"));

    await waitFor(() => {
      expect(mockNavigation.navigate).toHaveBeenCalledWith("Products");
    });
  });*/
});
