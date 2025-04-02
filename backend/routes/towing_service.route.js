import express from "express";;
import { createTowing_service, deleteTowing_service, getTowing_services, updateTowing_service } from "../controller/towing_service.controller.js";

const router = express.Router();

router.get("/", getTowing_services);
router.post("/", createTowing_service);
router.put("/:id",updateTowing_service);
router.delete ("/:id", deleteTowing_service); 

export default router;