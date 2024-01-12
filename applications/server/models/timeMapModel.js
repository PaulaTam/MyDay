import mongoose from "mongoose";

// creates a schema if it does not exist in mongodb
const timeMapSchema = mongoose.Schema({
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    timeTo: {
        type: Number,
        required: true,
    }

});
var TimeMapTable = mongoose.model("timeMap", timeMapSchema);

export default TimeMapTable;