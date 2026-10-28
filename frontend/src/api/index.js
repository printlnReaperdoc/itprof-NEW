import api from './client';

// Auth API
export const authApi = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  getSession: () => api.get('/auth/session')
};

// Courses API
export const coursesApi = {
  getAll: () => api.get('/courses'),
  getDetails: (courseId) => api.get(`/courses/${courseId}`)
};

// Chapters API
export const chaptersApi = {
  getDetails: (chapterId) => api.get(`/chapters/${chapterId}`),
  overrideProgress: (chapterId, data) => api.post(`/chapters/${chapterId}/override-progress`, data)
};

// Lessons API
export const lessonsApi = {
  getByChapter: (chapterId) => api.get(`/lessons/chapter/${chapterId}`),
  update: (chapterId, data) => api.put(`/lessons/chapter/${chapterId}`, data),
  uploadFile: (chapterId, formData) => api.post(`/lessons/chapter/${chapterId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteFile: (fileId) => api.delete(`/lessons/files/${fileId}`)
};

// Presentations API
export const presentationsApi = {
  getByChapter: (chapterId) => api.get(`/presentations/chapter/${chapterId}`),
  update: (chapterId, data) => api.put(`/presentations/chapter/${chapterId}`, data)
};

// Quizzes & Attempts API
export const quizzesApi = {
  getByChapter: (chapterId) => api.get(`/quizzes/chapter/${chapterId}`),
  getAllAnswerKeys: (params) => api.get('/quizzes/answer-keys', { params }),
  downloadAnswerKeysPDF: (courseId) => api.get('/exports/quizzes/answer-keys/pdf', {
    params: courseId ? { courseId } : {},
    responseType: 'blob'
  }),
  importQuestions: (chapterId, data, isMultipart = false) => {
    return api.post(`/quizzes/chapter/${chapterId}/import`, data, {
      headers: isMultipart ? { 'Content-Type': 'multipart/form-data' } : {}
    });
  },
  startAttempt: (chapterId) => api.post(`/quiz-attempts/chapter/${chapterId}/start`),
  saveAnswer: (attemptId, questionId, selectedOptionId) => 
    api.put(`/quiz-attempts/${attemptId}/answers`, { questionId, selectedOptionId }),
  submitAttempt: (attemptId) => api.post(`/quiz-attempts/${attemptId}/submit`),
  getAttemptReview: (attemptId) => api.get(`/quiz-attempts/${attemptId}/review`)
};

// Gradebook API
export const gradebookApi = {
  getTopic: (chapterId, params) => api.get(`/gradebook/topic/${chapterId}`, { params }),
  getMaster: (courseId) => api.get(`/gradebook/master/${courseId}`),
  getStudentSelf: () => api.get('/gradebook/student')
};

// Analytics API
export const analyticsApi = {
  getDashboard: () => api.get('/analytics/dashboard')
};

// Audit Logs API
export const auditApi = {
  getLogs: (params) => api.get('/audit-logs', { params })
};

// Export URLs
export const exportUrls = {
  masterXLSX: (courseId) => `/api/exports/master/${courseId}?format=xlsx`,
  masterCSV: (courseId) => `/api/exports/master/${courseId}?format=csv`,
  masterPDF: (courseId) => `/api/exports/master/${courseId}?format=pdf`,
  topicXLSX: (chapterId) => `/api/exports/topic/${chapterId}?format=xlsx`,
  answerKeysPDF: (courseId) => courseId ? `/api/exports/quizzes/answer-keys/pdf?courseId=${courseId}` : '/api/exports/quizzes/answer-keys/pdf'
};

