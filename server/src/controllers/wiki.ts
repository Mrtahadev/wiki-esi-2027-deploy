import { Request, Response } from 'express';
import Wiki, { IWiki } from '../models/Wiki';

// Get all wiki pages
export const getAllWikiPages = async (req: Request, res: Response) => {
  try {
    const wikiPages = await Wiki.find()
      .populate('createdBy', 'name')
      .populate('lastEditedBy', 'name')
      .sort({ updatedAt: -1 });
    
    res.json(wikiPages);
  } catch (error) {
    console.error('Get all wiki pages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get wiki page by slug
export const getWikiPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const wikiPage = await Wiki.findOne({ slug })
      .populate('createdBy', 'name')
      .populate('lastEditedBy', 'name')
      .populate('contributors', 'name');
    
    if (!wikiPage) {
      return res.status(404).json({ message: 'Wiki page not found' });
    }
    
    res.json(wikiPage);
  } catch (error) {
    console.error('Get wiki page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new wiki page
export const createWikiPage = async (req: Request, res: Response) => {
  try {
    const { title, content, tags } = req.body;
    const userId = (req as any).user.id;
    
    // Create slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    // Check if slug already exists
    const existingPage = await Wiki.findOne({ slug });
    if (existingPage) {
      return res.status(400).json({ message: 'A page with a similar title already exists' });
    }
    
    const newWikiPage = new Wiki({
      title,
      content,
      slug,
      tags: tags || [],
      createdBy: userId,
      lastEditedBy: userId,
      contributors: [userId]
    });
    
    await newWikiPage.save();
    
    res.status(201).json(newWikiPage);
  } catch (error) {
    console.error('Create wiki page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update wiki page
export const updateWikiPage = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { title, content, tags } = req.body;
    const userId = (req as any).user.id;
    
    const wikiPage = await Wiki.findOne({ slug });
    if (!wikiPage) {
      return res.status(404).json({ message: 'Wiki page not found' });
    }
    
    // Update fields
    if (title) wikiPage.title = title;
    if (content) wikiPage.content = content;
    if (tags) wikiPage.tags = tags;
    
    // Update editor
    wikiPage.lastEditedBy = userId;
    
    // Add to contributors if not already included
    if (!wikiPage.contributors.includes(userId)) {
      wikiPage.contributors.push(userId);
    }
    
    await wikiPage.save();
    
    res.json(wikiPage);
  } catch (error) {
    console.error('Update wiki page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete wiki page
export const deleteWikiPage = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    const wikiPage = await Wiki.findOne({ slug });
    if (!wikiPage) {
      return res.status(404).json({ message: 'Wiki page not found' });
    }
    
    await wikiPage.deleteOne();
    
    res.json({ message: 'Wiki page deleted successfully' });
  } catch (error) {
    console.error('Delete wiki page error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search wiki pages
export const searchWikiPages = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || typeof q !== 'string') {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const wikiPages = await Wiki.find(
      { $text: { $search: q } },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .populate('createdBy', 'name')
    .populate('lastEditedBy', 'name')
    .limit(10);
    
    res.json(wikiPages);
  } catch (error) {
    console.error('Search wiki pages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 