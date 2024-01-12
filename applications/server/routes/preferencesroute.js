import express from 'express';
import { createPreference, deletePreference } from '../controllers/preferencescontroller.js';
import { getPreference } from '../controllers/preferencescontroller.js';
import { updatePreference } from '../controllers/preferencescontroller.js';

const router = express.Router();

router.post("/preferencecreate", createPreference);
router.get("/getpreferences/:eventid", getPreference);
router.patch("/updatepreference", updatePreference);
router.delete("/deletepreference/:eventid", deletePreference);
 
export default router;