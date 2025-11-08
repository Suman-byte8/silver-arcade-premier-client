import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Remove token
      localStorage.removeItem('token');
      // No redirect to login page, let AuthModal handle authentication
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    const res = await api.post('/users/login', { email, password });
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await api.post('/users/register', userData);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await api.get('/users/profile');
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const res = await api.put('/users/profile', userData);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export default api;
