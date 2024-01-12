import mongoose from "mongoose";

// creates a schema if it does not exist in mongodb
const userSchema = mongoose.Schema({
    sfsuid: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    token:{
        type: String,
    }


});
var UserTable = mongoose.model("user", userSchema);

export default UserTable;