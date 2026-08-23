import mongoose from "mongoose";
import { GENDERS, USER_TYPES } from "../../../helper/enums.js";


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    state: { type: String },
    zipCode: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    gender: { type: String, enum: GENDERS, default: '' },
    userType: { type: String, enum: USER_TYPES, required: true }
}, {
    timestamps: true, versionKey: false
})


const User = mongoose.model("User", userSchema);
export default User;