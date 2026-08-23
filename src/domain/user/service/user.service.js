import { Worker } from 'node:worker_threads';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import xlsx from 'xlsx';
import User from '../model/user.model.js';
import Policy from '../../policy/model/policy.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class UserService {
  constructor() {}

 
  uploadFileService = async (fileBuffer) => {
    try {
      if (!fileBuffer) {
        return global.Helpers.errorFromService("No file provided.");
      }

      const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (!data.length) {
        return global.Helpers.errorFromService("Uploaded spreadsheet is empty.");
      }

      const workerPath = path.resolve(__dirname, './uploadWorker.js');
      
      const insertedCount = await new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, { workerData: data });

        worker.on('message', (result) => {
          if (result.success) resolve(result.count);
          else reject(new Error(result.error));
        });

        worker.on('error', (err) => reject(err));
        worker.on('exit', (code) => {
          if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
      });

      return global.Helpers.successFromService("File processed and data inserted successfully.", {
        totalProcessed: insertedCount
      });
    } catch (error) {
      return global.Helpers.errorFromService(error.message || "Error processing upload.");
    }
  };

 
 searchPolicyByUsernameService = async (username) => {
    try {
      if (!username) {
        return global.Helpers.errorFromService("Username parameter is required.");
      }

      const users = await User.find({ firstName: new RegExp(username, 'i') });

      if (!users.length) {
        return global.Helpers.successFromService("No user matching search query found.", []);
      }

      const userIds = users.map((u) => u._id);

      const policies = await Policy.aggregate([
        {
          $match: { userId: { $in: userIds } }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userId'
          }
        },
        { $unwind: { path: '$userId', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'lobs',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'categoryId'
          }
        },
        { $unwind: { path: '$categoryId', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'carriers',
            localField: 'companyId',
            foreignField: '_id',
            as: 'companyId'
          }
        },
        { $unwind: { path: '$companyId', preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: 'agents',
            localField: 'agentId',
            foreignField: '_id',
            as: 'agentId'
          }
        },
        { $unwind: { path: '$agentId', preserveNullAndEmptyArrays: true } }
      ]);

      return global.Helpers.successFromService("Policies fetched successfully.", policies);
    } catch (error) {
      
      return global.Helpers.errorFromService("Failed to fetch policies.");
    }
  };
 
  getAggregatedPoliciesService = async () => {
    try {
      const aggregatedData = await User.aggregate([
        {
          $lookup: {
            from: 'policies',
            localField: '_id',
            foreignField: 'userId',
            as: 'userPolicies'
          }
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            email: 1,
            phone: 1,
            totalPolicies: { $size: '$userPolicies' },
            userPolicies: '$userPolicies'
          }
        }
      ]);

      return global.Helpers.successFromService("Aggregated policy data retrieved.", aggregatedData);

    } catch (error) {
      return global.Helpers.errorFromService("Failed to aggregate user policies.");
    }
  };
}