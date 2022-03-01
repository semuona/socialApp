const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number
    },
    address: {
        type: String
    },
    image: {
        type: String
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
