import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LDMProvider } from './context/LDMContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CourseView from './pages/CourseView';
import ChapterView from './pages/ChapterView';
import QuizPage from './pages/QuizPage';
import GradebookPage from './pages/GradebookPage';
import AuditLogsPage from './pages/AuditLogsPage';
import FacultyAnswerKeysPage from './pages/FacultyAnswerKeysPage';

function App() {
  return (
    <LDMProvider>
      <AuthProvider>
        <BrowserRouter>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Student & Faculty Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/courses/:courseId"
                  element={
                    <ProtectedRoute>
                      <CourseView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/chapters/:chapterId"
                  element={
                    <ProtectedRoute>
                      <ChapterView />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/quiz/:chapterId"
                  element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/gradebook"
                  element={
                    <ProtectedRoute>
                      <GradebookPage />
                    </ProtectedRoute>
                  }
                />

                {/* Quiz Answer Keys Repository (Faculty Only) */}
                <Route
                  path="/answer-keys"
                  element={
                    <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                      <FacultyAnswerKeysPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/audit-logs"
                  element={
                    <ProtectedRoute allowedRoles={['faculty', 'admin']}>
                      <AuditLogsPage />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </LDMProvider>
  );
}

export default App;
