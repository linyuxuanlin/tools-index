import axios from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types';

const API_URL = '/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加请求拦截器，自动添加token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error('登录失败，请检查您的凭据');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<User> => {
  try {
    const response = await axiosInstance.post('/auth/register', credentials);
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    return user;
  } catch (error) {
    throw new Error('注册失败，请稍后再试');
  }
};

export const logout = (): void => {
  localStorage.removeItem('token');
};

export const getUser = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data.user;
  } catch (error) {
    throw new Error('获取用户信息失败');
  }
}; 