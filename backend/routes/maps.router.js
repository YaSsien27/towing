import express from "express";
import { getDistance } from "../controller/maps.controller.js";

const router = express.Router();

router.post("/get-distance", getDistance);

export default router;
