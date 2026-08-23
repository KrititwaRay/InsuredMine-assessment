import express from "express";
const router = express.Router();


const methodNotAllowed = (req, res, next) => globalThis.Helpers.methodNotAllowed(res, 'Method not allowed');

import { MessageMiddleware } from "../middleware/message.middleware.js";
const messageMiddleware = new MessageMiddleware()

import { CommonMiddleware } from "../../../helper/common_middleware.js";
const commonMiddleware = new CommonMiddleware();



let middleware = [];


import { MessageController } from "../controller/message.controller.js";
const messageController = new MessageController();


middleware = [
    messageMiddleware.scheduleMessageRule(),
    commonMiddleware.checkErrors
]

router
    .route('/schedule')
    .post(middleware, messageController.scheduleMessage)
    .all(methodNotAllowed)



export const message_routing = router;