import mongoose from "mongoose";
import UserTable from "./usermodel.js";

// creates a schema if it does not exist in mongodb
const goalSchema = mongoose.Schema({
    sfsuid: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    priority: {
        type: Number,
    },
    status: {
        type: String,
    },
    tags: {
        type: String,
    },
    duration: {
        type: Number,//in minutes
    }


});
var GoalTable = mongoose.model("goal", goalSchema);

export default GoalTable;