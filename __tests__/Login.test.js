import React from "react";
import { render, fireEvent, waitFor, act } from "@testing-library/react-native";
import Login from "../src/components/auth/Login";
import { login } from "../src/services/auth";

jest.mock("../src/services/auth");

describe("Login component", () => {
  const mockRevalidate = jest.fn();

  it("renders correctly", () => {
    const { getByTestId } = render(<Login revalidate={mockRevalidate} />);
    expect(getByTestId("email")).toBeTruthy();
    expect(getByTestId("password")).toBeTruthy();
    expect(getByTestId("submit")).toBeTruthy();
  });

  it("Snapshot is correct", () => {
    const { toJSON } = render(<Login revalidate={mockRevalidate} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("validates fields correctly", async () => {
    const { getByTestId, findByText } = render(
      <Login revalidate={mockRevalidate} />
    );

    fireEvent.changeText(getByTestId("email"), "invalid");
    fireEvent.changeText(getByTestId("password"), "");
    fireEvent.press(getByTestId("submit"));

    expect(await findByText("Invalid email")).toBeTruthy();
    expect(await findByText("Password is required")).toBeTruthy();
  });

  it("handles user input correctly", async () => {
    const { getByTestId } = render(<Login revalidate={mockRevalidate} />);
    fireEvent.changeText(getByTestId("email"), "test@example.com");
    fireEvent.changeText(getByTestId("password"), "password123");

    await waitFor(() => {
      expect(getByTestId("email").props.value).toBe("test@example.com");
      expect(getByTestId("password").props.value).toBe("password123");
    });
  });

  it("submits the form correctly", async () => {
    login.mockResolvedValueOnce();
    const { getByTestId } = render(<Login revalidate={mockRevalidate} />);

    fireEvent.changeText(getByTestId("email"), "user@example.com");
    fireEvent.changeText(getByTestId("password"), "password123");
    fireEvent.press(getByTestId("submit"));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith("user@example.com", "password123");
      expect(mockRevalidate).toHaveBeenCalled();
    });
  });

  it("handles loading and error states", async () => {
    login.mockRejectedValueOnce(new Error("Invalid credentials"));
    const { getByTestId, findByText } = render(
      <Login revalidate={mockRevalidate} />
    );

    fireEvent.changeText(getByTestId("email"), "user@example.com");
    fireEvent.changeText(getByTestId("password"), "wrongpassword");
    fireEvent.press(getByTestId("submit"));

    expect(await findByText("Invalid email or password")).toBeTruthy();
  });
});
