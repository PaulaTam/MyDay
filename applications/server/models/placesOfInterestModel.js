import mongoose from "mongoose";

// creates a schema if it does not exist in mongodb
const placesOfInterestSchema = mongoose.Schema({
    Subject: {
        type: String,
        required: true,
    },
    StartTime: {
        type: Date,
    },
    EndTime: {
        type: Date,
    },
    Location: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
    },
    price:{
        type: String,
    },
    averageTime: {
        type: Number,//in minutes
    },
    day: {
        type: String,
    }


});
var PlacesOfInterestTable = mongoose.model("placesOfInterest", placesOfInterestSchema);

export default PlacesOfInterestTable;