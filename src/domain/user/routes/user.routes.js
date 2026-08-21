import express from "express";
const router = express.Router();

const methodNotAllowed = (req, res, next) => globalThis.Helpers.methodNotAllowed(res, 'Method not allowed');


import { UserMiddleware } from "../middleware/user.middleware.js";
const userMiddleware = new UserMiddleware();


import { CommonMiddleware } from "../../../helper/common_middleware.js";
const commonMiddleware = new CommonMiddleware();

let middleware = [];


import { UserController } from "../controller/user.controller.js";
const userController = new UserController();

middleware = [
    userMiddleware.signupValidationRule(),
    commonMiddleware.checkErrors
]
router
    .route('/signup')
    .post(middleware, userController.signup)
    .all(methodNotAllowed)

export const user_routing = router;