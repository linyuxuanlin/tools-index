import axios from 'axios';
import { Tool } from '../types';

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

export const getTools = async (): Promise<Tool[]> => {
  try {
    const response = await axiosInstance.get('/tools');
    return response.data.tools;
  } catch (error) {
    throw new Error('获取工具列表失败');
  }
};

export const getFavorites = async (): Promise<Tool[]> => {
  try {
    const response = await axiosInstance.get('/tools/favorites');
    return response.data.tools;
  } catch (error) {
    throw new Error('获取收藏工具失败');
  }
};

export const addFavorite = async (toolId: string): Promise<void> => {
  try {
    await axiosInstance.post(`/tools/favorites/${toolId}`);
  } catch (error) {
    throw new Error('添加收藏失败');
  }
};

export const removeFavorite = async (toolId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/tools/favorites/${toolId}`);
  } catch (error) {
    throw new Error('取消收藏失败');
  }
}; 