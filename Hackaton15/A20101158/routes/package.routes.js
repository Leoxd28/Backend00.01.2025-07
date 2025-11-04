import express from "express";
import { createPackage, updatePackage, getPackages } from "../controllers/package.controller.js";

const router = express.Router();

router.post("/", createPackage);
router.put("/:id", updatePackage);
router.get("/", getPackages);

export default router;
