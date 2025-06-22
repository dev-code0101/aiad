import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom
import Home from "../pages/index";
import axios from "axios";

// Mocking axios
jest.mock("axios");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state and then backend message when healthy", async () => {
    // Mocking the health check and message response
    axios.get.mockResolvedValueOnce({ data: { status: "healthy" } }); // Health check
    axios.get.mockResolvedValueOnce({ data: { message: "Hello, World!" } }); // Message response

    await act(async () => {
      render(<Home />);
    });

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the status message to appear
    await waitFor(() => expect(screen.getByText(/Backend is connected!/i)).toBeInTheDocument(), {
      timeout: 1000,
    });
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
  });

  test("displays loading state and then error message when backend is not healthy", async () => {
    // Mocking the health check to fail
    axios.get.mockRejectedValueOnce({ data: { status: "unhealthy" } });

    await act(async () => {
      render(<Home />);
    });

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the status message to appear
    await waitFor(
      () => expect(screen.getByText(/Backend connection failed/i)).toBeInTheDocument(),
      { timeout: 1000 }
    );
    expect(screen.getByText(/Failed to connect to the backend/i)).toBeInTheDocument();
  });

  test("displays loading state and then error message when backend connection fails", async () => {
    // Mocking the health check to be healthy
    axios.get.mockResolvedValueOnce({ data: { status: "healthy" } }); // Health check
    // Mocking the message retrieval to throw an error
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch message"));

    await act(async () => {
      render(<Home />);
    });

    // Check for loading state
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Wait for the status message to appear
    await waitFor(
      () => expect(screen.getByText(/Backend connection failed/i)).toBeInTheDocument(),
      {
        timeout: 5000,
      }
    );
    expect(screen.getByText(/Failed to connect to the backend/i)).toBeInTheDocument();
  });
});
