const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  let count = 0;
  const interval = setInterval(() => {
    res.write(`data: { "tick": ${++count}, "time": "${new Date().toISOString()}" }\n\n`);
    if (count >= 5) {
      clearInterval(interval);
      res.write('event: end\ndata: Fin del stream\n\n');
      res.end();
    }
  }, 1000);
});

module.exports = router;
