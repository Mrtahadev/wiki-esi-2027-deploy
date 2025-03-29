"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const wiki_1 = require("../controllers/wiki");
const router = (0, express_1.Router)();
// Search wiki pages
router.get('/search', wiki_1.searchWikiPages);
// Get all wiki pages
router.get('/', wiki_1.getAllWikiPages);
// Get wiki page by slug
router.get('/:slug', wiki_1.getWikiPageBySlug);
// Create new wiki page
router.post('/', auth_1.authenticateToken, wiki_1.createWikiPage);
// Update wiki page
router.put('/:slug', auth_1.authenticateToken, wiki_1.updateWikiPage);
// Delete wiki page
router.delete('/:slug', auth_1.authenticateToken, wiki_1.deleteWikiPage);
exports.default = router;
