import { UserService } from "../service/user.service.js";

export class UserController {
  constructor() {
    this._userService = new UserService();
  }


  uploadFile = async (req, res) => {
    try {
      const fileBuffer = req.file ? req.file.buffer : null;
      let response_data = await this._userService.uploadFileService(fileBuffer);

      if (response_data.status) {
        return global.Helpers.successResponse(res, response_data.data, response_data.message);
      } else {
        return global.Helpers.sendBadRequest(res, response_data.message);
      }
    } catch (error) {
      return global.Helpers.sendBadRequest(res, 'Something went wrong. Please try again.');
    }
  };

 
  searchPolicyByUsername = async (req, res) => {
    try {
      const { username } = req.query;
      let response_data = await this._userService.searchPolicyByUsernameService(username);

      if (response_data.status) {
        return global.Helpers.successResponse(res, response_data.data, response_data.message);
      } else {
        return global.Helpers.sendBadRequest(res, response_data.message);
      }
    } catch (error) {
      return global.Helpers.sendBadRequest(res, 'Something went wrong. Please try again.');
    }
  };

 
  getAggregatedPolicies = async (req, res) => {
    try {
      let response_data = await this._userService.getAggregatedPoliciesService();

      if (response_data.status) {
        return global.Helpers.successResponse(res, response_data.data, response_data.message);
      } else {
        return global.Helpers.sendBadRequest(res, response_data.message);
      }
    } catch (error) {
      return global.Helpers.sendBadRequest(res, 'Something went wrong. Please try again.');
    }
  };
}