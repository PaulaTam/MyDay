import express from 'express';
import { getPlacesOfInterest } from '../controllers/placesOfInterestcontroller.js';
import { getPlaceOfInterest } from '../controllers/placesOfInterestcontroller.js';

const router = express.Router();

router.get("/viewplacesofinterest/", getPlacesOfInterest);
router.get("/viewplaceofinterest/:location", getPlaceOfInterest);
 
export default router;