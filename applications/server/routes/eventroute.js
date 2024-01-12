import express from 'express';
import { createEvent } from '../controllers/eventcontroller.js';
import { getEvents } from '../controllers/eventcontroller.js';
import { updateEvent } from '../controllers/eventcontroller.js';
import { deleteEvent } from '../controllers/eventcontroller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/eventcreate", verifyToken, createEvent);
router.get("/viewevents/:sfsuid", verifyToken, getEvents);
router.patch("/updateevent", verifyToken, updateEvent);
router.delete("/deleteevent", verifyToken, deleteEvent);
 
export default router;