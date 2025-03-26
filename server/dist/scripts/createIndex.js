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
const mongoose_1 = __importDefault(require("mongoose"));
const Wiki_1 = __importDefault(require("../models/Wiki"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wiki_db';
function recreateIndex() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect to MongoDB
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log('Connected to MongoDB');
            // Drop existing indexes
            yield Wiki_1.default.collection.dropIndexes();
            console.log('Dropped existing indexes');
            // Create new text index
            yield Wiki_1.default.collection.createIndex({ title: 'text', content: 'text' }, { name: 'text_index', default_language: 'french' });
            console.log('Created new text index');
            // Verify index was created
            const indexes = yield Wiki_1.default.collection.indexes();
            console.log('Current indexes:', indexes);
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            yield mongoose_1.default.disconnect();
            console.log('Disconnected from MongoDB');
        }
    });
}
recreateIndex();
