const express = require("express");
const router = express.Router();
const {
  getProducciones,
  postProduccion,
} = require("../controllers/produccion.controller");

router.get("/", getProducciones);
router.post("/", postProduccion);

module.exports = router;
