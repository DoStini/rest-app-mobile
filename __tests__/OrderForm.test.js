import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import OrderForm from "../src/components/orders/OrderForm";

const initialValues = { name: "", tableId: 0 };
const handleSubmit = jest.fn();
const tables = [
  { name: "Table 1", id: 1 },
  { name: "Table 2", id: 2 },
];
const loading = false;
const submitText = "Submit";

describe("OrderForm component", () => {
  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(
      <OrderForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        tables={tables}
        loading={loading}
        submitText={submitText}
      />
    );
    expect(getByText("Table 1")).toBeTruthy();
    expect(getByText("Table 2")).toBeTruthy();

    expect(getByPlaceholderText("Table's Name")).toBeTruthy();
    expect(getByText(submitText)).toBeTruthy();
  });

  it("Snapshot is correct", () => {
    const { toJSON } = render(
      <OrderForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        tables={tables}
        loading={loading}
        submitText={submitText}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("requires necessary fields", async () => {
    const { getByTestId, findByText } = render(
      <OrderForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        tables={tables}
        loading={loading}
        submitText={submitText}
      />
    );
    fireEvent.press(getByTestId("orderFormButton"));

    expect(await findByText("Name is required")).toBeTruthy();
    expect(await findByText("Table is required")).toBeTruthy();
  });

  /*it("handles user input correctly", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <OrderForm
        initialValues={initialValues}
        handleSubmit={handleSubmit}
        tables={tables}
        loading={loading}
        submitText={submitText}
      />
    );

    fireEvent.press(getByText("Table 1"));
    fireEvent.changeText(getByPlaceholderText("Table's Name"), "Test Name");
    fireEvent.press(getByTestId("orderFormButton"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: "Test Name",
        tableId: 1,
      });
    });
  });*/
});
