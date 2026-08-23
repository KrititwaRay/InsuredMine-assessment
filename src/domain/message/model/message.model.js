import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: { type: String, required: true, trim: true },
    scheduledAt: { type: Date, required: true }

}, { timestamps: true, versionKey: false })


const Message = mongoose.model("Message", messageSchema);

export default Message;