const express = require("express");
const router = require("./router/index.js");

const app = express();

const PORT = 3002;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hackatón Express Avanzado 🚀");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});
