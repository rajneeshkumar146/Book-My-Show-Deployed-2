const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user", "partner"],
        required: true,
        default: "user"
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    // New Otp fields added.
    otp: {
        type: String,
    },
    otpExpiry: {
        type: Date,
    }
});


const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;