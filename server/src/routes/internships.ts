import { Router, Response } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all internships
router.get('/', (req: AuthRequest, res: Response) => {
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
router.get('/:id', (req: AuthRequest, res: Response) => {
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
router.post('/', authenticateToken, (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.status(201).json({ 
    ...req.body,
    id: Date.now().toString(),
    postedDate: new Date().toISOString()
  });
});

// Update internship
router.put('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  const { id } = req.params;
  res.json({ 
    ...req.body,
    id,
    updatedAt: new Date().toISOString()
  });
});

// Delete internship
router.delete('/:id', authenticateToken, (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  
  res.status(200).json({ message: 'Internship deleted successfully' });
});

export default router; 