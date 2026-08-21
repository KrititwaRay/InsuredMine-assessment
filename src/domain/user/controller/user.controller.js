
import { UserService } from "../service/user.service.js"
export class UserController {
    constructor() {
        this._userService = new UserService()
    }


    signup = async (req, res) => {
        try {
            let response_data = await this._userService.signupService(req.body);

            if (response_data.status) {
                return global.Helpers.successResponse(res, response_data.data, response_data.message);
            } else {
                return global.Helpers.sendBadRequest(res, response_data.message);
            }
        } catch (error) {
            return global.Helpers.sendBadRequest(res, 'Something went wrong. Please try again.')
        }

    }
}