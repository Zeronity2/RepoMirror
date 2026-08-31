require("dotenv").config();

const express = require("express");
const cors = require("cors");

const analyzeRoutes = require("./routes/analyzeRoutes");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api", analyzeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "RepoMirror API is running 🚀",
  });
});

app.listen(PORT, () => {
  console.log(`RepoMirror server running on port ${PORT}`);
});