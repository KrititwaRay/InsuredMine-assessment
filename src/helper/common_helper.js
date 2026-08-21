export class CommonHelper {

    capitalizeFirstLetter(obj) {
        obj.status.message = obj.status.message.toLowerCase();
        obj.status.message = obj.status.message.charAt(0).toUpperCase() + obj.status.message.slice(1);
        return obj;
    }

    methodNotAllowed(res, msg) {
        let response_data = {
            dataset: {},
            status: {
                action_status: false,
                message: msg
            }
        };
        res.setHeader('content-type', 'application/json');
        res.status(global.httpCodes.HTTP_RESPONSE_METHOD_NOT_ALLOWED);
        res.send({ response: response_data });
    }


    successResponse(res, dataSet, msg) {
        let response_data = {
            data: dataSet,
            status: {
                message: msg,
                action_status: true
            }
        }
        res.status(global.httpCodes.HTTP_RESPONSE_OK);
        res.send({ response: this.capitalizeFirstLetter(response_data) });

    }


    sendBadRequest(res, msg) {

        let response_data = {
            data: {},
            status: {
                message: msg,
                action_status: false
            }
        }
        res.status(global.httpCodes.HTTP_RESPONSE_BAD_REQUEST);
        res.send({ response: this.capitalizeFirstLetter(response_data) });

    }

    successFromService = (msg, data) => {
        let successObj = {
            status: true,
            status_code: global.httpCodes.HTTP_RESPONSE_OK,
            data: data,
            message: msg
        }
        return successObj;
    }
    errorFromService = (msg, data) => {
        let successObj = {
            status: false,
            status_code: global.httpCodes.HTTP_RESPONSE_BAD_REQUEST,
            message: msg
        }
        return successObj;
    }

    notAuthorized(res, msg) {

        let response_data = {
            status: {
                message: msg,
                action_status: false
            }
        }
        res.status(global.httpCodes.HTTP_RESPONSE_UNAUTHORIZED);
        res.send({ response: this.capitalizeFirstLetter(response_data) });
    }

    notFoundResponse = (msg) => {
        let responseObj = {
            status: false,
            status_code: global.httpCodes.HTTP_RESPONSE_NOT_FOUND,
            message: msg
        }
        return responseObj;
    }

}