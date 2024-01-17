import React from "react";
import { render } from "@testing-library/react-native";
import TabBarMarker from "../../src/components/tabBar/TabBarMarker";

describe("TabBarMarker", () => {
  it("renders with correct style", () => {
    const { getByTestId } = render(<TabBarMarker animatedStyle={{}} />);
    expect(getByTestId("tabBarMarker")).toBeTruthy();
  });
});
