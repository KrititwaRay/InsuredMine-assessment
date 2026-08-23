import mongoose from "mongoose";

const lobSchema = new mongoose.Schema({
    categoryName: { type: String, required: true, unique: true, trim: true }

}, { timestamps: true, versionKey: false })


const LOB = mongoose.model("LOB", lobSchema);
export default LOB;