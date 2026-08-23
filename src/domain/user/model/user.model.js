import mongoose from "mongoose";
import { GENDERS, USER_TYPES } from "../../../helper/enums";


const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true, required: true, index: true },
    dob: { type: Date },
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zip: { type: String, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    gender: { type: String, enum: GENDERS, default: '' },
    userType: { type: String, enum: USER_TYPES, default: 'Active Client' },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true, versionKey: false
})


const userModel = mongoose.model("User", userSchema);
export default userModel;