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
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers["authorization"].replace("Bearer ", "");
        const data = yield jwt.verify(token, process.env.JWT_KEY);
        const user = yield prisma.user.findUnique({
            where: {
                id: data.id,
            },
        });
        if (data.exp * 1000 < Date.now()) {
            yield prisma.user.update({
                where: {
                    id: data.id,
                },
                data: {
                    token: "",
                },
            });
            throw new Error();
        }
        const tokenValid = user.token === token;
        if (!user || !tokenValid) {
            return res
                .status(401)
                .send({ error: "Not authorized to access this resource" });
        }
        req.user = user;
        req.token = token;
        next();
    }
    catch (error) {
        console.log(error.message);
        res.status(401).send({ error: "Not authorized to access this resource" });
    }
});
exports.default = auth;
