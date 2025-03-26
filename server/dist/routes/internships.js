"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all internships
router.get('/', (req, res) => {
    res.json([
        {
            id: '1',
            title: 'Stage en Développement Web',
            company: 'TechMaroc',
            location: 'Casablanca, Maroc',
            description: 'Description du stage...',
            requirements: ['HTML/CSS', 'JavaScript', 'React'],
            applicationUrl: 'https://example.com/apply',
            postedDate: new Date().toISOString(),
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        }
    ]);
});
// Get a specific internship by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({
        id,
        title: 'Stage en Développement Web',
        company: 'TechMaroc',
        location: 'Casablanca, Maroc',
        description: 'Description du stage...',
        requirements: ['HTML/CSS', 'JavaScript', 'React'],
        applicationUrl: 'https://example.com/apply',
        postedDate: new Date().toISOString(),
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    });
});
// Create new internship (admin only)
router.post('/', auth_1.authenticateToken, (req, res) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.status(201).json(Object.assign(Object.assign({}, req.body), { id: Date.now().toString(), postedDate: new Date().toISOString() }));
});
// Update internship
router.put('/:id', auth_1.authenticateToken, (req, res) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    const { id } = req.params;
    res.json(Object.assign(Object.assign({}, req.body), { id, updatedAt: new Date().toISOString() }));
});
// Delete internship
router.delete('/:id', auth_1.authenticateToken, (req, res) => {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    res.status(200).json({ message: 'Internship deleted successfully' });
});
exports.default = router;
