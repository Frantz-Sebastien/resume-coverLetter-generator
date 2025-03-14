import express from "express";
import { generateResume } from "../controllers/resumeController.js"

const router = express.Router()

router.post("/", generateResume);

export default router;