import express from "express";
import cors from "cors";
import fs from "node:fs";

const app = express();
const PORT = 1999;

const mapText = fs.readFileSync("./map.ascii", "utf-8");
const mapRows = mapText.trim().split("\n");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/map", (req, res) => {
    res.json({ map: mapRows });
})

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
