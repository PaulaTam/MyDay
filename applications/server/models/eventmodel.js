import mongoose from "mongoose";

// creates a schema if it does not exist in mongodb
const eventSchema = mongoose.Schema({
    eventid:{
        type: Number,
        //required: true,
    },
    sfsuid: {
        type: Number,
        //required: true,
    },
    Subject: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    isAllDay: {
        type: Boolean,
    },
    StartTime: {
        type: Date,
        //required: true,
    },
    EndTime: {
        type: Date,
        //required: true,
    },
    days: {
        type: String,
        //required: false,
    },
    RecurrenceRule: {
        type: String,
    },
    startDate: {
        type: Date,
        //required: false,
    },
    endDate: {
        type: Date,
        //required: false,
    },
    Location: {
        type: String,
        required: false,
        default: "Burk Hall, Holloway Avenue, San Francisco, CA, USA",
    },
    tags: {
        type: String,
        //required: false,
    },

});
var EventTable = mongoose.model("event", eventSchema);

export default EventTable;