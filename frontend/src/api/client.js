import axios from 'axios';

// Base API instance configured with environment-based baseURL and credentials
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// In-memory cache for CSRF token (required for cross-site deployments where
// document.cookie cannot read HttpOnly or cross-domain cookies)
let inMemoryCsrfToken = null;

export const setCsrfToken = (token) => {
  if (token) {
    inMemoryCsrfToken = token;
  }
};

export const getCsrfToken = () => inMemoryCsrfToken || getCookie('XSRF-TOKEN');

// Helper to get cookie value (for same-domain / local dev)
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// Request interceptor to attach CSRF token automatically
api.interceptors.request.use(async (config) => {
  const method = config.method ? config.method.toLowerCase() : 'get';
  const isSafeMethod = ['get', 'head', 'options'].includes(method);

  if (!isSafeMethod) {
    let token = inMemoryCsrfToken || getCookie('XSRF-TOKEN');

    // If token is not cached yet, proactively fetch it from the server
    if (!token && !config.url?.includes('/auth/csrf-token')) {
      try {
        const baseURL = config.baseURL || import.meta.env.VITE_API_URL || '/api';
        const cleanBase = baseURL.replace(/\/+$/, '');
        const csrfRes = await axios.get(`${cleanBase}/auth/csrf-token`, { withCredentials: true });
        token = csrfRes.data?.csrfToken || csrfRes.headers?.['x-csrf-token'];
        if (token) {
          inMemoryCsrfToken = token;
        }
      } catch {
        // Allow request to proceed; backend CSRF middleware will return error if required
      }
    }

    if (token) {
      config.headers['X-CSRF-Token'] = token;
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor for capturing updated CSRF tokens and consistent error handling
api.interceptors.response.use(
  (response) => {
    // Extract CSRF token from response headers if present
    const headerToken = response.headers?.['x-csrf-token'] || response.headers?.['X-CSRF-Token'];
    if (headerToken) {
      inMemoryCsrfToken = headerToken;
    } else if (response.data && response.data.csrfToken) {
      inMemoryCsrfToken = response.data.csrfToken;
    }

    // Return response.data directly for consistent client usage
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Retry once on EBADCSRFTOKEN error by fetching a fresh CSRF token
    if (
      error.response?.status === 403 &&
      error.response?.data?.code === 'EBADCSRFTOKEN' &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const baseURL = originalRequest.baseURL || import.meta.env.VITE_API_URL || '/api';
        const cleanBase = baseURL.replace(/\/+$/, '');
        const csrfRes = await axios.get(`${cleanBase}/auth/csrf-token`, { withCredentials: true });
        const newToken = csrfRes.data?.csrfToken || csrfRes.headers?.['x-csrf-token'];
        if (newToken) {
          inMemoryCsrfToken = newToken;
          originalRequest.headers['X-CSRF-Token'] = newToken;
          const retryRes = await axios(originalRequest);
          return retryRes.data;
        }
      } catch {
        // If recovery fails, fall through to error rejection
      }
    }

    const errorData = error.response?.data || {
      success: false,
      message: error.message || 'An unexpected error occurred. Please try again.'
    };
    return Promise.reject(errorData);
  }
);

export default api;
