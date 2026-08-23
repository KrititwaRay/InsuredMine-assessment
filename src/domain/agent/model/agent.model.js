import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
    agentName: { type: String, required: true, unique: true, trim: true, index: true },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true, versionKey: false })


const agentModel = mongoose.model("Agent", agentSchema);
export default agentModel;