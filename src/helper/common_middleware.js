import { validationResult } from "express-validator";

export class CommonMiddleware {
    constructor() { }

    checkErrors = async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            let response_status = {};
            let response_dataset = {};
            let response_data = {};
            let errorVal = errors.array();
            response_dataset = errors.array();

            response_status.msg = errorVal[0].msg.toLowerCase();
            response_status.msg = response_status.msg.charAt(0).toUpperCase() + response_status.msg.slice(1);

            response_status.action_status = false;
            response_data.data = response_dataset;
            response_data.status = response_status;


            res.send({ response: response_data });
        } else {
            next()
        }
    }
}

