import { Router, Request, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { getAllWikiPages, getWikiPageBySlug, createWikiPage, updateWikiPage, deleteWikiPage, searchWikiPages } from '../controllers/wiki';

const router = Router();

// Search wiki pages
router.get('/search', searchWikiPages);

// Get all wiki pages
router.get('/', getAllWikiPages);

// Get wiki page by slug
router.get('/:slug', getWikiPageBySlug);

// Create new wiki page
router.post('/', authenticateToken, createWikiPage);

// Update wiki page
router.put('/:slug', authenticateToken, updateWikiPage);

// Delete wiki page
router.delete('/:slug', authenticateToken, deleteWikiPage);

export default router;