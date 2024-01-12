import express from 'express';
import { getTimeTo } from '../controllers/timeMapcontroller.js';
import { createTimemap } from '../controllers/timeMapcontroller.js';

const router = express.Router();

router.get("/gettimeto", getTimeTo);
router.post("/create",createTimemap)

export default router;