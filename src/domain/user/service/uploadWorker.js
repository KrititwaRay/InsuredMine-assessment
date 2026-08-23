import { parentPort, workerData } from 'node:worker_threads';
import connectDB from '../../../configuration/db.js';
import Agent from '../../agent/model/agent.model.js';
import User from '../model/user.model.js';
import Account from '../../account/model/account.model.js';
import LOB from '../../lob/model/lob.model.js';
import Carrier from '../../carrier/model/carrier.model.js';
import Policy from '../../policy/model/policy.model.js';

const processFile = async () => {
  try {
    await connectDB();
    const rows = workerData;
    let insertedCount = 0;

    for (const row of rows) {
      //Agent
      let agent = null;
      if (row.agent && row.agent.trim()) {
        agent = await Agent.findOne({ agentName: row.agent.trim() });
        if (!agent) {
          agent = await Agent.create({ agentName: row.agent.trim() });
        }
      }

      // User
      let user = await User.findOne({ email: row.email.trim().toLowerCase() });
      if (!user) {
        user = await User.create({
          firstName: row.firstname || row.firstName,
          dob: new Date(row.dob),
          address: row.address,
          phone: row.phone,
          state: row.state,
          zipCode: row.zip || row.zipCode,
          email: row.email.trim().toLowerCase(),
          gender: row.gender || '',
          userType: row.userType || row.user_type || 'Active Client'
        });
      }

      //User's Account
      let account = await Account.findOne({
        accountName: row.account_name || row.accountName,
        userId: user._id
      });
      if (!account) {
        account = await Account.create({
          accountName: row.account_name || row.accountName,
          accountType: row.account_type || 'Personal',
          userId: user._id
        });
      }

      //Policy Category (LOB) 
      let category = await LOB.findOne({ categoryName: row.category_name.trim() });
      if (!category) {
        category = await LOB.create({ categoryName: row.category_name.trim() });
      }

      // Policy Carrier 
      let carrier = await Carrier.findOne({ companyName: row.company_name.trim() });
      if (!carrier) {
        carrier = await Carrier.create({ companyName: row.company_name.trim() });
      }

      // Policy
      let policy = await Policy.findOne({ policyNumber: row.policy_number });
      if (!policy) {
        await Policy.create({
          policyNumber: row.policy_number,
          policyStartDate: new Date(row.policy_start_date),
          policyEndDate: new Date(row.policy_end_date),
          policyType: row.policy_type || 'Single',
          categoryId: category._id,
          companyId: carrier._id,
          userId: user._id,
          agentId: agent ? agent._id : null
        });
      }

      insertedCount++;
    }

    parentPort.postMessage({ success: true, count: insertedCount });
  } catch (error) {
    parentPort.postMessage({ success: false, error: error.message });
  }
};

processFile();