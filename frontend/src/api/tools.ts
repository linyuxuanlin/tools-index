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
  if (!toolId || toolId === 'undefined') {
    console.error('收藏失败：无效的工具ID', toolId);
    throw new Error('无效的工具ID');
  }
  
  try {
    await axiosInstance.post(`/tools/favorites/${toolId}`);
  } catch (error: any) {
    console.error('添加收藏请求失败:', error?.response?.data || error);
    if (error?.response?.status === 401) {
      throw new Error('请先登录后再收藏');
    }
    throw new Error(error?.response?.data?.message || '添加收藏失败');
  }
};

export const removeFavorite = async (toolId: string): Promise<void> => {
  if (!toolId || toolId === 'undefined') {
    console.error('取消收藏失败：无效的工具ID', toolId);
    throw new Error('无效的工具ID');
  }
  
  try {
    await axiosInstance.delete(`/tools/favorites/${toolId}`);
  } catch (error: any) {
    console.error('取消收藏请求失败:', error?.response?.data || error);
    if (error?.response?.status === 401) {
      throw new Error('请先登录后再操作');
    }
    throw new Error(error?.response?.data?.message || '取消收藏失败');
  }
}; 