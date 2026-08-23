import mongoose from "mongoose";

const carrierSchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true, trim: true, index: true },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false })


const carrierModel = mongoose.model("Carrier", carrierSchema);
export default carrierModel;