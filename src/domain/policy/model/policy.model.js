import mongoose from "mongoose";
import { POLICY_TYPES } from "../../../helper/enums";

const policySchema = new mongoose.Schema({
    policyNumber: { type: String, required: true, unique: true, trim: true, index: true },
    policyStartDate: { type: Date },
    policyEndDate: { type: Date },
    policyMode: { type: Number },
    producer: { type: String, trim: true },
    premiumAmountWritten: { type: Number },
    premiumAmount: { type: Number },
    policyType: { type: String, enum: POLICY_TYPES },
    csr: { type: String, trim: true },
    primary: { type: String, trim: true },
    applicantId: { type: String, trim: true },
    agencyId: { type: String, trim: true },
    hasActiveClientPolicy: { type: String, trim: true },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'LOB', required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false })


const policyModel = mongoose.model("Policy", policySchema);
export default policyModel;