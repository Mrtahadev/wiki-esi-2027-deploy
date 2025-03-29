import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Setup CORS to allow requests from the client
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3002',
  credentials: true
}));
app.use(helmet({ 
  contentSecurityPolicy: false // Disable CSP for development
}));
app.use(morgan('dev'));
app.use(express.json());

// Define path to client build directory
const clientBuildPath = path.join(__dirname, '../../client/build');

// Serve static files from the React app's build directory
app.use(express.static(clientBuildPath));

// Mock user data for authentication
const users = [
  { id: '1', name: 'Admin User', email: 'admin@esi.ma', password: 'admin123', role: 'admin' },
  { id: '2', name: 'Student User', email: 'student@esi.ma', password: 'student123', role: 'student' }
];

// Mock wiki data
const wikiPages = [
  { 
    id: '1', 
    title: 'Getting Started with ESI', 
    slug: 'getting-started', 
    content: 'Welcome to ESI! This guide will help you get started with your studies.',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: '2', 
    title: 'Campus Resources', 
    slug: 'campus-resources', 
    content: 'Learn about all the resources available to you on campus.',
    author: 'Admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// API health check
app.get('/api/health', (req: Request, res: Response): void => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Authentication routes
app.post('/api/auth/login', (req: Request, res: Response): void => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  
  // In a real app, we'd use JWT here
  const { password: _, ...userWithoutPassword } = user;
  res.json({ 
    user: userWithoutPassword,
    token: `mock-jwt-token-${user.id}`
  });
});

app.post('/api/auth/register', (req: Request, res: Response): void => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  
  // Create new user
  const newUser = {
    id: (users.length + 1).toString(),
    name,
    email,
    password,
    role: 'student'
  };
  
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json({
    user: userWithoutPassword,
    token: `mock-jwt-token-${newUser.id}`
  });
});

// Wiki routes
app.get('/api/wiki', (req: Request, res: Response): void => {
  res.json(wikiPages);
});

// Search wiki pages - must come before the :slug route to prevent conflicts
app.get('/api/wiki/search', (req: Request, res: Response): void => {
  const query = req.query.q as string;
  
  if (!query) {
    res.status(400).json({ message: 'Search query is required' });
    return;
  }
  
  const results = wikiPages.filter(page => 
    page.title.toLowerCase().includes(query.toLowerCase()) || 
    page.content.toLowerCase().includes(query.toLowerCase())
  );
  
  res.json(results);
});

// This route needs to come after '/api/wiki/search' to avoid conflicts
app.get('/api/wiki/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const page = wikiPages.find(p => p.slug === slug);
  
  if (!page) {
    res.status(404).json({ message: 'Wiki page not found' });
    return;
  }
  
  res.json(page);
});

app.post('/api/wiki', (req: Request, res: Response): void => {
  const { title, content, author } = req.body;
  
  // Create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Check if slug already exists
  if (wikiPages.find(p => p.slug === slug)) {
    res.status(400).json({ message: 'A page with this title already exists' });
    return;
  }
  
  const newPage = {
    id: (wikiPages.length + 1).toString(),
    title,
    slug,
    content,
    author,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  wikiPages.push(newPage);
  res.status(201).json(newPage);
});

app.put('/api/wiki/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  const { title, content } = req.body;
  
  const pageIndex = wikiPages.findIndex(p => p.slug === slug);
  
  if (pageIndex === -1) {
    res.status(404).json({ message: 'Wiki page not found' });
    return;
  }
  
  wikiPages[pageIndex] = {
    ...wikiPages[pageIndex],
    title,
    content,
    updatedAt: new Date().toISOString()
  };
  
  res.json(wikiPages[pageIndex]);
});

app.delete('/api/wiki/:slug', (req: Request, res: Response): void => {
  const { slug } = req.params;
  
  const pageIndex = wikiPages.findIndex(p => p.slug === slug);
  
  if (pageIndex === -1) {
    res.status(404).json({ message: 'Wiki page not found' });
    return;
  }
  
  wikiPages.splice(pageIndex, 1);
  res.status(204).send();
});

// Fallback route handler for client-side routing
// This should be the LAST route
app.get('*', (req: Request, res: Response): void => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat-message', (message) => {
    io.emit('new-message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server with clear error handling
const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}).on('error', (err: any) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('Error starting server:', err);
  }
}); 