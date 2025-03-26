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
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
const router = (0, express_1.Router)();
// Get chat history
router.get('/history', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const messages = yield ChatMessage_1.default.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(messages);
    }
    catch (error) {
        next(error);
    }
}));
// Send a message
router.post('/message', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const message = new ChatMessage_1.default({
            content: req.body.content,
            isUser: req.body.isUser,
            userId: req.user.id
        });
        yield message.save();
        res.status(201).json(message);
    }
    catch (error) {
        next(error);
    }
}));
// Clear chat history (admin only)
router.delete('/clear', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        yield ChatMessage_1.default.deleteMany({ userId: req.user.id });
        res.json({ message: 'Chat history cleared' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
