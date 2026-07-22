import express from "express";
import cors from "cors";

function createApp(mapRows, bookings) {
  const app = express();
  const bookedCabanas = new Map();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/map", (req, res) => {
    res.json({ map: mapRows, bookedCabanas: [...bookedCabanas.keys()] });
  });

  app.post("/api/cabanas/:cabanaId/book", (req, res) => {
    const cabanaId = req.params.cabanaId;
    const { room, guestName } = req.body ?? {};
    if (
      typeof room !== "string" ||
      typeof guestName !== "string" ||
      !room.trim() ||
      !guestName.trim()
    )
      return res
        .status(400)
        .json({ error: "Room and guest name are required" });

    const guestExists = bookings.some(
      (booking) => booking.guestName === guestName && booking.room === room,
    );

    if (!guestExists)
      return res.status(400).json({ error: "Guest not found in bookings" });

    const [row, column] = cabanaId.split("-").map((num) => Number(num));
    const isCabana = mapRows[row]?.[column] === "W";

    if (!isCabana) return res.status(400).json({ error: "Cabana not found" });

    const isBooked = bookedCabanas.has(cabanaId);
    if (isBooked)
      return res.status(409).json({ error: "Cabana already booked" });

    bookedCabanas.set(cabanaId, { room, guestName });

    res
      .status(201)
      .json({
        cabanaId,
        room,
        guestName,
        message: "Cabana booked successfully",
      });
  });

  return app;
}

export default createApp;
