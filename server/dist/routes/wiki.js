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
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const WikiPage_1 = require("../models/WikiPage");
const router = (0, express_1.Router)();
const searchWikiPages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const pages = yield WikiPage_1.WikiPage.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });
        res.json(pages);
    }
    catch (error) {
        next(error);
    }
});
const getAllWikiPages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pages = yield WikiPage_1.WikiPage.find();
        res.json(pages);
    }
    catch (error) {
        next(error);
    }
});
const getWikiPageBySlug = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield WikiPage_1.WikiPage.findOne({ slug: req.params.slug });
        if (!page) {
            res.status(404).json({ message: 'Page not found' });
            return;
        }
        res.json(page);
    }
    catch (error) {
        next(error);
    }
});
const createWikiPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const page = new WikiPage_1.WikiPage(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
        yield page.save();
        res.status(201).json(page);
    }
    catch (error) {
        next(error);
    }
});
const updateWikiPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const page = yield WikiPage_1.WikiPage.findOneAndUpdate({ slug: req.params.slug, userId: req.user.id }, req.body, { new: true });
        if (!page) {
            res.status(404).json({ message: 'Page not found' });
            return;
        }
        res.json(page);
    }
    catch (error) {
        next(error);
    }
});
const deleteWikiPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const page = yield WikiPage_1.WikiPage.findOneAndDelete({
            slug: req.params.slug,
            userId: req.user.id
        });
        if (!page) {
            res.status(404).json({ message: 'Page not found' });
            return;
        }
        res.json({ message: 'Page deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
router.get('/search', searchWikiPages);
router.get('/', getAllWikiPages);
router.get('/:slug', getWikiPageBySlug);
router.post('/', auth_1.authenticateToken, createWikiPage);
router.put('/:slug', auth_1.authenticateToken, updateWikiPage);
router.delete('/:slug', auth_1.authenticateToken, deleteWikiPage);
exports.default = router;
