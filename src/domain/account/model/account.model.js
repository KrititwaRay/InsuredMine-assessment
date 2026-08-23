import mongoose from "mongoose";
import { ACCOUNT_TYPES } from "../../../helper/enums";

const accountSchema = new mongoose.Schema({
    accountName: { type: String, required: true, trim: true },
    accountType: { type: String, enum: ACCOUNT_TYPES, required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false })


const accountModel = mongoose.model("Account", accountSchema);
export default accountModel;