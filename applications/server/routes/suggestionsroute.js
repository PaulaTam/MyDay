import express from 'express';
import {getSuggestions} from '../controllers/suggestionscontroller.js';
const router = express.Router();

router.post("/suggestion", getSuggestions);


export default router;