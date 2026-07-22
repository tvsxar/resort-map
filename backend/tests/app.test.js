import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import createApp from "../app.js";

const mapRows = ["...", ".W.", "..."];

const bookings = [
  {
    room: "101",
    guestName: "Alice Smith",
  },
];

let app;

beforeEach(() => {
  app = createApp(mapRows, bookings);
});

describe("GET /api/health", () => {
  it("returns server status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /api/map", () => {
  it("returns map and empty booked cabanas", async () => {
    const response = await request(app).get("/api/map");

    expect(response.status).toBe(200);
    expect(response.body.map).toEqual(mapRows);
    expect(response.body.bookedCabanas).toEqual([]);
  });
});

describe("POST /api/cabanas/:cabanaId/book", () => {
  it("books an available cabana for a valid guest", async () => {
    const response = await request(app).post("/api/cabanas/1-1/book").send({
      room: "101",
      guestName: "Alice Smith",
    });

    expect(response.status).toBe(201);
    expect(response.body.cabanaId).toBe("1-1");
    expect(response.body.message).toBe("Cabana booked successfully");
  });

  it("rejects an unknown guest", async () => {
    const response = await request(app).post("/api/cabanas/1-1/book").send({
      room: "999",
      guestName: "Unknown Guest",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Guest not found in bookings");
  });

  it("rejects missing guest details", async () => {
    const response = await request(app).post("/api/cabanas/1-1/book").send({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Room and guest name are required");
  });

  it("rejects a map cell that is not a cabana", async () => {
    const response = await request(app).post("/api/cabanas/0-0/book").send({
      room: "101",
      guestName: "Alice Smith",
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Cabana not found");
  });

  it("rejects booking an already booked cabana", async () => {
    const guest = {
      room: "101",
      guestName: "Alice Smith",
    };

    const firstResponse = await request(app)
      .post("/api/cabanas/1-1/book")
      .send(guest);

    const secondResponse = await request(app)
      .post("/api/cabanas/1-1/book")
      .send(guest);

    expect(firstResponse.status).toBe(201);
    expect(secondResponse.status).toBe(409);
    expect(secondResponse.body.error).toBe("Cabana already booked");
  });

  it("shows the cabana as booked after booking", async () => {
    await request(app).post("/api/cabanas/1-1/book").send({
      room: "101",
      guestName: "Alice Smith",
    });

    const mapResponse = await request(app).get("/api/map");

    expect(mapResponse.status).toBe(200);
    expect(mapResponse.body.bookedCabanas).toContain("1-1");
  });
});
