import express from 'express';
import { createGoal } from '../controllers/goalcontroller.js';
import { getGoals } from '../controllers/goalcontroller.js';
import { updateGoal } from '../controllers/goalcontroller.js';

const router = express.Router();

router.post("/goalcreate", createGoal);
router.get("/viewgoals/:sfsuid", getGoals);
router.post("/updateGoal", updateGoal);

export default router;