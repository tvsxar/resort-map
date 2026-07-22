import createApp from "./app.js";
import fs from "node:fs";

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

const app = createApp(mapRows, bookings);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
