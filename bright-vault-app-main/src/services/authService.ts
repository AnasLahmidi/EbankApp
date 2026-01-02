import { api } from './api';
import { LoginRequest, AuthResponse, RegisterRequest } from '@/types';

export const authService = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login', credentials);
  },

  register: async (data: RegisterRequest): Promise<{ message: string; userId: number }> => {
    return api.post<{ message: string; userId: number }>('/auth/register', data);
  },

  refreshToken: async (): Promise<{ token: string }> => {
    return api.post<{ token: string }>('/auth/refresh');
  },

  validateToken: async (): Promise<boolean> => {
    try {
      await api.get('/auth/validate');
      return true;
    } catch {
      return false;
    }
  },
};
