"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load env variables
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/wiki-esi-2027',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
    nodeEnv: process.env.NODE_ENV || 'development'
};
