import mongoose from "mongoose";
import { POLICY_TYPES } from "../../../helper/enums.js";

const policySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true, unique: true, trim: true },
    policyStartDate: { type: Date, required: true },
    policyEndDate: { type: Date, required: true },
    policyType: { type: String, enum: POLICY_TYPES },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }
}, { timestamps: true, versionKey: false })


const Policy = mongoose.model("Policy", policySchema);
export default Policy;