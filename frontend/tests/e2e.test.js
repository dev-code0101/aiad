import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import axios from "axios";

// Mocking axios
jest.mock("axios");

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state initially", () => {
    render(<Home />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("displays backend message when healthy", async () => {
    // Mocking the health check and message response
    axios.get.mockResolvedValueOnce({ data: { status: "healthy" } }); // Health check
    axios.get.mockResolvedValueOnce({ data: { message: "Hello, World!" } }); // Message response

    render(<Home />);

    // Wait for the status message to appear
    await waitFor(() => expect(screen.getByText(/Backend is connected!/i)).toBeInTheDocument());
    expect(screen.getByText(/Hello, World!/i)).toBeInTheDocument();
  });

  test("displays error message when backend is not healthy", async () => {
    // Mocking the health check to fail
    axios.get.mockResolvedValueOnce({ data: { status: "unhealthy" } });

    render(<Home />);

    // Wait for the status message to appear
    await waitFor(() => expect(screen.getByText(/Backend connection failed/i)).toBeInTheDocument());
    expect(screen.getByText(/Failed to connect to the backend/i)).toBeInTheDocument();
  });

  test("displays error message when backend connection fails", async () => {
    // Mocking the health check to throw an error
    axios.get.mockRejectedValueOnce(new Error("Network Error"));

    render(<Home />);

    // Wait for the status message to appear
    await waitFor(() => expect(screen.getByText(/Backend connection failed/i)).toBeInTheDocument());
    expect(screen.getByText(/Failed to connect to the backend/i)).toBeInTheDocument();
  });
});
