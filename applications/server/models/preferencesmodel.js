import { ObjectId } from "mongodb";
import mongoose from "mongoose";

// creates a schema if it does not exist in mongodb
const preferencesSchema = mongoose.Schema({
    eventid:{
        type: ObjectId,
        required: true,
    },
    amount: {
        type: Number,
    },
    timeUnits: {
        type: String,
    },
    relative: {
        type: String,
    },
    otherEventid: {
        type: Number,
    },
    location: {
        type: String,
    },
    repeat: {
        type: Boolean
    },
    days: {
        type: String
    },
    numberOfTimes: {
        type: Number
    },
    everyTimeUnit: {
        type: String
    },
    tags: {
        type: Array
    }


});
var PreferencesTable = mongoose.model("preferences", preferencesSchema);

export default PreferencesTable;