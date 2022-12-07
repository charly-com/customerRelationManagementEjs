"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(process.env.Database_Url, () => {
    console.log("Database connected");
});
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
