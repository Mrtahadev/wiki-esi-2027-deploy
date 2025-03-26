export interface User {
  id: string;
  name: string;
  email: string;
}

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