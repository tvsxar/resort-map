import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("App", () => {
  it("loads and displays a cabana", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          map: ["W"],
          bookedCabanas: [],
        }),
      }),
    );

    render(<App />);

    const cabana = await screen.findByAltText("Cabana");

    expect(cabana).toBeInTheDocument();
  });

  it("opens the booking form after clicking an available cabana", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          map: ["W"],
          bookedCabanas: [],
        }),
      }),
    );

    render(<App />);

    const cabana = await screen.findByAltText("Cabana");

    await user.click(cabana);

    expect(
      screen.getByRole("heading", {
        name: "Book a cabana",
      }),
    ).toBeInTheDocument();
  });

  it("closes the booking form after clicking Cancel", async () => {
    const user = userEvent.setup();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          map: ["W"],
          bookedCabanas: [],
        }),
      }),
    );

    render(<App />);

    const cabanaButton = await screen.findByRole("button", {
      name: "Cabana",
    });

    await user.click(cabanaButton);

    expect(
      screen.getByRole("heading", {
        name: "Book a cabana",
      }),
    ).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", {
      name: "Cancel",
    });

    await user.click(cancelButton);

    expect(
      screen.queryByRole("heading", {
        name: "Book a cabana",
      }),
    ).not.toBeInTheDocument();
  });

  it("shows an error when required fields are empty", async () => {
    const user = userEvent.setup();

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        map: ["W"],
        bookedCabanas: [],
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    const cabanaButton = await screen.findByRole("button", {
      name: "Cabana",
    });

    await user.click(cabanaButton);

    const bookButton = screen.getByRole("button", {
      name: "Book",
    });

    await user.click(bookButton);

    expect(
      screen.getByText("Please provide all required fields"),
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows a booking error returned by the server", async () => {
    const user = userEvent.setup();

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          map: ["W"],
          bookedCabanas: [],
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          error: "Guest not found in bookings",
        }),
      });

    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    const cabanaButton = await screen.findByRole("button", {
      name: "Cabana",
    });

    await user.click(cabanaButton);

    const nameInput = screen.getByLabelText("Guest name");
    const roomInput = screen.getByLabelText("Room number");

    await user.type(nameInput, "Unknown Guest");
    await user.type(roomInput, "999");

    await user.click(
      screen.getByRole("button", {
        name: "Book",
      }),
    );

    expect(
      await screen.findByText("Guest not found in bookings"),
    ).toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("books a cabana and makes it unavailable", async () => {
    const user = userEvent.setup();

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          map: ["W"],
          bookedCabanas: [],
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          cabanaId: "0-0",
          room: "101",
          guestName: "John Smith",
          message: "Cabana booked successfully",
        }),
      });

    vi.stubGlobal("fetch", fetchMock);

    render(<App />);

    const cabanaButton = await screen.findByRole("button", {
      name: "Cabana",
    });

    await user.click(cabanaButton);

    await user.type(screen.getByLabelText("Guest name"), "John Smith");

    await user.type(screen.getByLabelText("Room number"), "101");

    await user.click(
      screen.getByRole("button", {
        name: "Book",
      }),
    );

    await waitFor(() => {
      expect(cabanaButton).toBeDisabled();
    });

    expect(
      screen.queryByRole("heading", {
        name: "Book a cabana",
      }),
    ).not.toBeInTheDocument();

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});
