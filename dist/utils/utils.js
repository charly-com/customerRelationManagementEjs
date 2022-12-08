"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.usersLoginSchema = exports.usersSignUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.usersSignUpSchema = joi_1.default.object({
    name: joi_1.default.string()
        .min(3)
        .max(30)
        .required(),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirm_password: joi_1.default.ref('password'),
    access_token: joi_1.default.string(),
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
});
exports.usersLoginSchema = joi_1.default.object({
    email: joi_1.default.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'dev'] } })
        .required(),
    password: joi_1.default.string()
        .min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
    confirm_password: joi_1.default.ref('password'),
    access_token: joi_1.default.string(),
});
// export const loginSchema = Joi.object().keys({
//     email: Joi.string().trim().lowercase().required(),
//     password: Joi.string()
//       .regex(/^[a-zA-Z0-9]{3,30}$/)
//       .required(),
//   });
const generateToken = function (_id) {
    if (process.env.JWT_SECRET) {
        return jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
    }
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
