import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RessourcesListPage from './pages/WikiListPage';
import WikiEditPage from './pages/WikiEditPage';
import WikiViewPage from './pages/WikiViewPage';
import InternshipsPage from './pages/InternshipsPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import ChatroomPage from './pages/ChatroomPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import NotFoundPage from './pages/NotFoundPage';
import ActualitePage from './pages/ActualitePage';
import RetourExperiencePage from './pages/RetourExperiencePage';
import FilieresPage from './pages/FilieresPage';
import FiliereDetailPage from './pages/FiliereDetailPage';
import DepartmentPage from './pages/ressources/DepartmentPage';
import CoursePage from './pages/ressources/CoursePage';
import CourseMaterialPage from './pages/ressources/CourseMaterialPage';

// Components
import NavBar from './components/common/NavBar';
import Chatbot from './components/chatbot/Chatbot';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <NavBar />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/ressources" element={<RessourcesListPage />} />
                <Route path="/ressources/:department/:section" element={<DepartmentPage />} />
                <Route path="/ressources/:department/cours" element={<CoursePage />} />
                <Route path="/ressources/:department/cours/:courseId" element={<CourseMaterialPage />} />
                <Route path="/ressources/view/:slug" element={<WikiViewPage />} />
                <Route path="/ressources/create" element={
                  <ProtectedRoute>
                    <WikiEditPage />
                  </ProtectedRoute>
                } />
                <Route path="/ressources/edit/:slug" element={
                  <ProtectedRoute>
                    <WikiEditPage />
                  </ProtectedRoute>
                } />
                <Route path="/internships" element={<InternshipsPage />} />
                <Route path="/internships/:id" element={<InternshipDetailPage />} />
                <Route path="/chatroom" element={<ChatroomPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/actualite" element={<ActualitePage />} />
                <Route path="/retour-experience" element={<RetourExperiencePage />} />
                <Route path="/filieres" element={<FilieresPage />} />
                <Route path="/filieres/:id" element={<FiliereDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            
            <Chatbot />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
