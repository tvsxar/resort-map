import express from "express";

const app = express();
const PORT = 1999;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
