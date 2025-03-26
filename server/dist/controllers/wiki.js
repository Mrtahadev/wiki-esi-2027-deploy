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
exports.searchWikiPages = exports.deleteWikiPage = exports.updateWikiPage = exports.createWikiPage = exports.getWikiPageBySlug = exports.getAllWikiPages = void 0;
const Wiki_1 = __importDefault(require("../models/Wiki"));
// Get all wiki pages
const getAllWikiPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const wikiPages = yield Wiki_1.default.find()
            .populate('createdBy', 'name')
            .populate('lastEditedBy', 'name')
            .sort({ updatedAt: -1 });
        res.json(wikiPages);
    }
    catch (error) {
        console.error('Get all wiki pages error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getAllWikiPages = getAllWikiPages;
// Get wiki page by slug
const getWikiPageBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const wikiPage = yield Wiki_1.default.findOne({ slug })
            .populate('createdBy', 'name')
            .populate('lastEditedBy', 'name')
            .populate('contributors', 'name');
        if (!wikiPage) {
            return res.status(404).json({ message: 'Wiki page not found' });
        }
        res.json(wikiPage);
    }
    catch (error) {
        console.error('Get wiki page error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.getWikiPageBySlug = getWikiPageBySlug;
// Create new wiki page
const createWikiPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, tags } = req.body;
        const userId = req.user.id;
        // Create slug from title
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        // Check if slug already exists
        const existingPage = yield Wiki_1.default.findOne({ slug });
        if (existingPage) {
            return res.status(400).json({ message: 'A page with a similar title already exists' });
        }
        const newWikiPage = new Wiki_1.default({
            title,
            content,
            slug,
            tags: tags || [],
            createdBy: userId,
            lastEditedBy: userId,
            contributors: [userId]
        });
        yield newWikiPage.save();
        res.status(201).json(newWikiPage);
    }
    catch (error) {
        console.error('Create wiki page error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.createWikiPage = createWikiPage;
// Update wiki page
const updateWikiPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const { title, content, tags } = req.body;
        const userId = req.user.id;
        const wikiPage = yield Wiki_1.default.findOne({ slug });
        if (!wikiPage) {
            return res.status(404).json({ message: 'Wiki page not found' });
        }
        // Update fields
        if (title)
            wikiPage.title = title;
        if (content)
            wikiPage.content = content;
        if (tags)
            wikiPage.tags = tags;
        // Update editor
        wikiPage.lastEditedBy = userId;
        // Add to contributors if not already included
        if (!wikiPage.contributors.includes(userId)) {
            wikiPage.contributors.push(userId);
        }
        yield wikiPage.save();
        res.json(wikiPage);
    }
    catch (error) {
        console.error('Update wiki page error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.updateWikiPage = updateWikiPage;
// Delete wiki page
const deleteWikiPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { slug } = req.params;
        const wikiPage = yield Wiki_1.default.findOne({ slug });
        if (!wikiPage) {
            return res.status(404).json({ message: 'Wiki page not found' });
        }
        yield wikiPage.remove();
        res.json({ message: 'Wiki page deleted successfully' });
    }
    catch (error) {
        console.error('Delete wiki page error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteWikiPage = deleteWikiPage;
// Search wiki pages
const searchWikiPages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        if (!q || typeof q !== 'string') {
            return res.status(400).json({ message: 'Search query is required' });
        }
        const wikiPages = yield Wiki_1.default.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } })
            .sort({ score: { $meta: 'textScore' } })
            .populate('createdBy', 'name')
            .populate('lastEditedBy', 'name')
            .limit(10);
        res.json(wikiPages);
    }
    catch (error) {
        console.error('Search wiki pages error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.searchWikiPages = searchWikiPages;
