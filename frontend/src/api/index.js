import api from './client';

export const triggerBlobDownload = (blob, defaultFilename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = defaultFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

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
  overrideProgress: (chapterId, data) => api.post(`/chapters/${chapterId}/override-progress`, data),
  getSummary: (chapterId, params) => api.get(`/chapters/${chapterId}/summary`, { params }),
  downloadSummaryPDF: async (chapterId, params = {}) => {
    const blob = await api.get(`/exports/chapter/${chapterId}/summary/pdf`, {
      params,
      responseType: 'blob'
    });
    triggerBlobDownload(blob, `Chapter_${chapterId}_Summary_${params.sortBy || 'surname'}.pdf`);
  },
  downloadSummaryXLSX: async (chapterId, params = {}) => {
    const blob = await api.get(`/exports/chapter/${chapterId}/summary/xlsx`, {
      params,
      responseType: 'blob'
    });
    triggerBlobDownload(blob, `Chapter_${chapterId}_Summary_${params.sortBy || 'surname'}.xlsx`);
  },
  downloadSummaryCSV: async (chapterId, params = {}) => {
    const blob = await api.get(`/exports/chapter/${chapterId}/summary/csv`, {
      params,
      responseType: 'blob'
    });
    triggerBlobDownload(blob, `Chapter_${chapterId}_Summary_${params.sortBy || 'surname'}.csv`);
  }
};

// Lessons API
export const lessonsApi = {
  getByChapter: (chapterId) => api.get(`/lessons/chapter/${chapterId}`),
  update: (chapterId, data) => api.put(`/lessons/chapter/${chapterId}`, data),
  uploadFile: (chapterId, formData) => api.post(`/lessons/chapter/${chapterId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  downloadFile: async (fileId, filename) => {
    const blob = await api.get(`/lessons/files/${fileId}/download`, { responseType: 'blob' });
    triggerBlobDownload(blob, filename || 'chapter-material');
  },
  getFileDownloadUrl: (fileId, inline = false) => `/api/lessons/files/${fileId}/download${inline ? '?inline=true' : ''}`,
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
  downloadAnswerKeysPDF: async (courseId) => {
    const blob = await api.get('/exports/quizzes/answer-keys/pdf', {
      params: courseId ? { courseId } : {},
      responseType: 'blob'
    });
    triggerBlobDownload(blob, courseId ? `Course_${courseId}_Answer_Keys.pdf` : 'IT_Prof_Electives_Master_Quiz_Answer_Keys.pdf');
  },
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
  answerKeysPDF: (courseId) => courseId ? `/api/exports/quizzes/answer-keys/pdf?courseId=${courseId}` : '/api/exports/quizzes/answer-keys/pdf',
  chapterSummaryPDF: (chapterId, sortBy = 'surname', sortOrder = 'asc') => `/api/exports/chapter/${chapterId}/summary/pdf?sortBy=${sortBy}&sortOrder=${sortOrder}`,
  chapterSummaryXLSX: (chapterId, sortBy = 'surname', sortOrder = 'asc') => `/api/exports/chapter/${chapterId}/summary/xlsx?sortBy=${sortBy}&sortOrder=${sortOrder}`,
  chapterSummaryCSV: (chapterId, sortBy = 'surname', sortOrder = 'asc') => `/api/exports/chapter/${chapterId}/summary/csv?sortBy=${sortBy}&sortOrder=${sortOrder}`
};
