import mongoose from "mongoose";

const carrierSchema = new mongoose.Schema({
    companyName: { type: String, required: true, unique: true, trim: true }

}, { timestamps: true, versionKey: false })


const Carrier = mongoose.model("Carrier", carrierSchema);
export default Carrier;