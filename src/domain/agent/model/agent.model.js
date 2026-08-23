import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    agentName: { type: String, required: true, unique: true, trim: true, index: true }

}, { timestamps: true, versionKey: false })


const Agent = mongoose.model("Agent", agentSchema);
export default Agent;