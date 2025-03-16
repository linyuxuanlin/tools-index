export interface User {
  id: string;
  email: string;
  name?: string;
  favorites: string[];
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  category: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
} 