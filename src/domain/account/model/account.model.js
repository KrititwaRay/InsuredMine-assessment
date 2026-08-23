import mongoose from "mongoose";
import { ACCOUNT_TYPES } from "../../../helper/enums.js";

const accountSchema = new mongoose.Schema({
    accountName: { type: String, required: true, trim: true },
    accountType: { type: String, enum: ACCOUNT_TYPES, default: 'Personal' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true, versionKey: false })


const Account = mongoose.model("Account", accountSchema);
export default Account;