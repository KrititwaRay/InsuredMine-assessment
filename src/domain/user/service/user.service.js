export class UserService {
    constructor() { }

    signupService = async (reqBody) => {
        try {

            return global.Helpers.successFromService("user registered successfully.", {

            })
        } catch (error) {
            return global.Helpers.errorFromService("Something went wrong, please try again later.")

        }
    }

}