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
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// In-memory storage for chat messages (replace with database in production)
const chatMessages = [];
// Get chat history
router.get('/history', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(chatMessages);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
// Send a message
router.post('/message', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { message } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!message || !userId) {
            return res.status(400).json({ error: 'Message and user ID are required' });
        }
        const newMessage = {
            message,
            timestamp: new Date(),
            userId
        };
        chatMessages.push(newMessage);
        // Mock bot response
        const botResponse = {
            message: 'This is a mock response from the bot.',
            timestamp: new Date(),
            userId: 'bot'
        };
        chatMessages.push(botResponse);
        return res.json({ userMessage: newMessage, botResponse });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
// Clear chat history (admin only)
router.delete('/clear', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (userRole !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        chatMessages.length = 0;
        return res.json({ message: 'Chat history cleared successfully' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
