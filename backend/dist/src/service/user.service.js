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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserService = exports.signInService = exports.createUserService = void 0;
const schemas_1 = require("../entity/schemas");
const db_module_1 = __importDefault(require("../repository/db.module"));
const jwt = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUserService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = schemas_1.signupSchema.validate(params);
        if (error) {
            throw new Error(error.message);
        }
        const { email, password, name } = params;
        let user = yield db_module_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            throw new Error("User already exists");
        }
        const encryptedPassword = yield bcryptjs_1.default.hash(password, 8);
        user = yield db_module_1.default.user.create({
            data: {
                email,
                password: encryptedPassword,
                name,
                credits: 100,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.createUserService = createUserService;
const signInService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = schemas_1.signInSchema.validate(params);
        if (error) {
            throw new Error(error.message);
        }
        const { email, password } = params;
        let user = yield db_module_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            throw new Error("Email or password incorrect");
        }
        const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("Email or password incorrect");
        }
        const token = yield jwt.sign({ id: user.id, name: user.name }, process.env.JWT_KEY, {
            expiresIn: "1d",
        });
        user = yield db_module_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                token: token,
            },
        });
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.signInService = signInService;
const getUserService = (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!params.userId) {
            throw new Error("User ID is required");
        }
        let user = yield db_module_1.default.user.findUnique({
            where: {
                id: params.userId,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    catch (error) {
        throw error;
    }
});
exports.getUserService = getUserService;
