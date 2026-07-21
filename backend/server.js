import express from "express";
import cors from "cors";
import fs from "node:fs";

const app = express();
const PORT = 1999;

function getArgument(flag, defaultValue) {
  const index = process.argv.indexOf(flag);

  if (index === -1) {
    return defaultValue;
  }

  const value = process.argv[index + 1];

  if (!value || value.startsWith("--")) {
    console.error(`Missing value for ${flag}`);
    process.exit(1);
  }

  return value;
}

function readTextFile(filePath, fileName) {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch {
    console.error(`Failed to read ${fileName} file: ${filePath}`);
    process.exit(1);
  }
}

function parseBookings(bookingsText) {
  try {
    return JSON.parse(bookingsText);
  } catch {
    console.error("Bookings file contains invalid JSON");
    process.exit(1);
  }
}

const mapPath = getArgument("--map", "./map.ascii");
const mapText = readTextFile(mapPath, "map");
const mapRows = mapText.trim().split("\n");

const bookingsPath = getArgument("--bookings", "./bookings.json");
const bookingsText = readTextFile(bookingsPath, "bookings");
const bookings = parseBookings(bookingsText);

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
    return res.status(400).json({ error: "Room and guest name are required" });

  const guestExists = bookings.some(
    (booking) => booking.guestName === guestName && booking.room === room,
  );

  if (!guestExists)
    return res.status(400).json({ error: "Guest not found in bookings" });

  const [row, column] = cabanaId.split("-").map((num) => Number(num));
  const isCabana = mapRows[row]?.[column] === "W";

  if (!isCabana) return res.status(400).json({ error: "Cabana not found" });

  const isBooked = bookedCabanas.has(cabanaId);
  if (isBooked) return res.status(409).json({ error: "Cabana already booked" });

  bookedCabanas.set(cabanaId, { room, guestName });

  res
    .status(201)
    .json({ cabanaId, room, guestName, message: "Cabana booked successfully" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
