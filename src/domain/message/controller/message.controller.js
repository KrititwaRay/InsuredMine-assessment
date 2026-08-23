import { MessageService } from "../service/message.service.js"

export class MessageController {
    constructor() {
        this._messageService = new MessageService();
    }

    scheduleMessage = async (req, res) => {
        try {
            let response_data = await this._messageService.scheduleMessageService(req.body);

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