"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../service/user.service");
exports.userController = {
    signUp: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.createUserService)(request.body);
            response.status(200).json({
                status: 200,
                success: true,
                user,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
    signIn: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.signInService)(request.body);
            response.status(200).json({
                status: 200,
                success: true,
                user,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
    getUser: (request, response) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.getUserService)({ userId: request.user.id });
            response.status(200).json({
                status: 200,
                success: true,
                user,
            });
        }
        catch (error) {
            response.status(500).json({
                status: 500,
                success: false,
                message: error.message,
            });
        }
    }),
};
