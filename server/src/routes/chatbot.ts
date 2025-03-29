import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../middleware/auth';

interface ChatMessage {
  message: string;
  timestamp: Date;
  userId: string;
}

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const router = express.Router();

// In-memory storage for chat messages (replace with database in production)
const chatMessages: ChatMessage[] = [];

// Get chat history
router.get('/history', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    res.json(chatMessages);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send a message
router.post('/message', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!message || !userId) {
      res.status(400).json({ error: 'Message and user ID are required' });
      return;
    }

    const newMessage: ChatMessage = {
      message,
      timestamp: new Date(),
      userId
    };

    chatMessages.push(newMessage);

    // Mock bot response
    const botResponse: ChatMessage = {
      message: 'This is a mock response from the bot.',
      timestamp: new Date(),
      userId: 'bot'
    };

    chatMessages.push(botResponse);

    res.json({ userMessage: newMessage, botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear chat history (admin only)
router.delete('/clear', authenticateToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userRole = req.user?.role;
    
    if (userRole !== 'admin') {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    chatMessages.length = 0;
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 