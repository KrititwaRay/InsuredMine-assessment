import express from "express";
const router = express.Router();
import multer from 'multer';

const methodNotAllowed = (req, res, next) => globalThis.Helpers.methodNotAllowed(res, 'Method not allowed');


import { CommonMiddleware } from "../../../helper/common_middleware.js";
const commonMiddleware = new CommonMiddleware();

let middleware = [];


import { UserController } from "../controller/user.controller.js";
const userController = new UserController();

const upload = multer({ storage: multer.memoryStorage() });

middleware = [
    upload.single('file'),
    commonMiddleware.checkErrors
]
router
    .route('/upload')
    .post(middleware, userController.uploadFile)
    .all(methodNotAllowed)


middleware = [
    commonMiddleware.checkErrors
]
router
    .route('/search-policy')
    .get(middleware, userController.searchPolicyByUsername)
    .all(methodNotAllowed)


middleware = [
    commonMiddleware.checkErrors
]
router
    .route('/aggregated-policies')
    .get(middleware, userController.getAggregatedPolicies)
    .all(methodNotAllowed)

export const user_routing = router;