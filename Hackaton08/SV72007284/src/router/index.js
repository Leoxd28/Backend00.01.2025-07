const express = require("express");
const { readdirSync } = require("fs");

const router = express.Router();

const ROUTER_PATH = `${__dirname}`;

readdirSync(ROUTER_PATH).filter((filename) => {
  const cleanName = filename.split(".").shift();
  if (cleanName !== "index") {
    router.use(`/${cleanName}`, require(`./${filename}`));
  }
});
module.exports = router;