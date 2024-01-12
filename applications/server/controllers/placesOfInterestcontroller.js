import PlacesOfInterestTable from "../models/placesOfInterestModel.js";

//returns all places of interest
export const getPlacesOfInterest = async (req, res) => {
     try{
        const placesOfInterest = await PlacesOfInterestTable.find();
        res.json(placesOfInterest);
    }

    catch(err){
        res.status(409).json({message: "data not found"});
    }
}

//returns places of interest with a specific location
export const getPlaceOfInterest = async (req, res) => {
  try{
     const placesOfInterest = await PlacesOfInterestTable.find({location: req.params.location});
     res.json(placesOfInterest);
 }

 catch(err){
     res.status(409).json({message: "data not found"});
 }
}