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
const Internship_1 = require("../models/Internship");
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const internships = yield Internship_1.Internship.find().sort({ createdAt: -1 });
        res.json(internships);
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const internship = new Internship_1.Internship(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
        yield internship.save();
        res.status(201).json(internship);
    }
    catch (error) {
        next(error);
    }
}));
router.put('/:id', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const internship = yield Internship_1.Internship.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
        if (!internship) {
            res.status(404).json({ message: 'Internship not found' });
            return;
        }
        res.json(internship);
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', auth_1.authenticateToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const internship = yield Internship_1.Internship.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!internship) {
            res.status(404).json({ message: 'Internship not found' });
            return;
        }
        res.json({ message: 'Internship deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
