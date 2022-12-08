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
exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const utils_1 = require("../utils/utils");
const userModel_1 = __importDefault(require("../Models/userModel"));
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, confirm_password } = req.body;
    const validateResult = utils_1.usersSignUpSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        res.status(400).json({
            Error: validateResult.error.details[0].message
        });
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const token = (0, utils_1.generateToken)(req.body._id);
    const user = {
        name,
        email,
        password: hashedPassword,
        confirm_password: hashedPassword,
        access_token: token
    };
    const users = yield userModel_1.default.create(user);
    res.status(200).json({
        message: "User created successfully",
        users,
        token
    });
}));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const validateResult = utils_1.usersLoginSchema.validate(req.body, utils_1.options);
    if (validateResult.error) {
        res.status(400).json({
            Error: validateResult.error.details[0].message
        });
    }
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400).json({
            message: "User does not exist"
        });
    }
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.status(200).json({
            message: "User logged in successfully",
            user
        });
    }
}));
