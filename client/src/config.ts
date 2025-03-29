// Application Configuration
// Determine API URL based on environment
const isDevelopment = process.env.NODE_ENV === 'development';
export const API_URL = isDevelopment 
  ? 'http://localhost:5001' 
  : 'https://your-api-server-url.com';  // Replace with your actual production API URL when available

export const APP_NAME = 'Wiki ESI 2027';

// Feature Flags
export const ENABLE_CHATBOT = false; // Disabled - not implemented in the simplified server

// Authentication Settings
export const AUTH_TOKEN_KEY = 'esi_auth_token';
export const AUTH_USER_KEY = 'esi_user';

// UI Configuration
export const DEFAULT_PAGINATION_LIMIT = 10;
export const DEFAULT_THEME = 'light';

// Demo Credentials
export const DEMO_ADMIN = { email: 'admin@esi.ma', password: 'admin123' };
export const DEMO_STUDENT = { email: 'student@esi.ma', password: 'student123' }; 