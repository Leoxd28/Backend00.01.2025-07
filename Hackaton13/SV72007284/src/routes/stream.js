const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.write(":ok\n\n");
  let count = 0;
  const iv = setInterval(() => {
    count++;
    res.write(`id: ${count}\n`);
    res.write(`event: tick\n`);
    res.write(
      `data: ${JSON.stringify({
        tick: count,
        ts: new Date().toISOString(),
      })}\n\n`
    );
    if (count >= 5) {
      clearInterval(iv);
      res.write(
        `event: done\ndata: ${JSON.stringify({ message: "finished" })}\n\n`
      );
      res.end();
    }
  }, 1000);
  req.on("close", () => clearInterval(iv));
});

module.exports = router;
