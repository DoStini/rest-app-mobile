import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import TabBarComponent from "../../src/components/tabBar/TabBarComponent";

describe("TabBarComponent", () => {
  const mockProps = {
    title: "Test Title",
    icon: "home",
    isSelected: false,
    onPress: jest.fn(),
  };

  it("renders with correct title and icon", () => {
    const { getByText } = render(<TabBarComponent {...mockProps} />);
    expect(getByText("Test Title")).toBeTruthy();
  });

  it("calls onPress function when pressed", () => {
    const { getByText } = render(<TabBarComponent {...mockProps} />);
    fireEvent.press(getByText("Test Title"));

    expect(mockProps.onPress).toHaveBeenCalled();
  });
});
