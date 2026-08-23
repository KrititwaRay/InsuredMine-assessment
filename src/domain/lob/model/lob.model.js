import mongoose from "mongoose";

const LOBSchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true, trim: true, index: true },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false })


const LOBModel = mongoose.model("LOB", LOBSchema);
export default LOBModel;