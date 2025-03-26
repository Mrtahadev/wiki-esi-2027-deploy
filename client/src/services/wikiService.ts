import axios from 'axios';
import { API_URL } from '../config';

export interface WikiPage {
  _id: string;
  title: string;
  content: string;
  slug: string;
  tags: string[];
  createdBy: string;
  lastEditedBy: string;
  contributors: string[];
  createdAt: string;
  updatedAt: string;
}

export interface WikiPageInput {
  title: string;
  content: string;
  tags: string[];
}

// Mock data in case API isn't available yet
const mockPages: WikiPage[] = [
  { 
    _id: '1', 
    title: 'Introduction à la programmation', 
    content: 'Contenu de l\'article...', 
    slug: 'introduction-programmation',
    tags: ['programmation', 'débutant'],
    createdBy: 'user1',
    lastEditedBy: 'user1',
    contributors: ['user1'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    _id: '2', 
    title: 'Structures de données', 
    content: 'Contenu de l\'article...', 
    slug: 'structures-donnees',
    tags: ['algorithmes', 'programmation'],
    createdBy: 'user2',
    lastEditedBy: 'user3',
    contributors: ['user2', 'user3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get all wiki pages
export const getAllWikiPages = async (): Promise<WikiPage[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/wiki`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wiki pages:', error);
    return mockPages; // Return mock data if API fails
  }
};

// Get wiki page by slug
export const getWikiPageBySlug = async (slug: string): Promise<WikiPage> => {
  try {
    const response = await axios.get(`${API_URL}/api/wiki/${slug}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching wiki page ${slug}:`, error);
    // Return a mock page with the requested slug
    return mockPages.find(p => p.slug === slug) || {
      _id: '1',
      title: 'Page Example',
      content: 'Contenu de la page...',
      slug,
      tags: ['exemple'],
      createdBy: 'user1',
      lastEditedBy: 'user1',
      contributors: ['user1'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

// Create new wiki page
export const createWikiPage = async (pageData: WikiPageInput): Promise<WikiPage> => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(`${API_URL}/api/wiki`, pageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating wiki page:', error);
    throw error;
  }
};

// Update wiki page
export const updateWikiPage = async (slug: string, pageData: Partial<WikiPageInput>): Promise<WikiPage> => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/api/wiki/${slug}`, pageData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating wiki page ${slug}:`, error);
    throw error;
  }
};

// Delete wiki page
export const deleteWikiPage = async (slug: string): Promise<void> => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/api/wiki/${slug}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (error) {
    console.error(`Error deleting wiki page ${slug}:`, error);
    throw error;
  }
};

// Search wiki pages
export const searchWikiPages = async (query: string): Promise<WikiPage[]> => {
  try {
    const response = await axios.get(`${API_URL}/api/wiki/search?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching wiki pages:', error);
    throw error;
  }
}; 