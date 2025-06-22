import api from './axios';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
}

export const authApi = {
  login: (data: LoginRequest) => api.post<LoginResponse>('/auth/login/', data),
  register: (data: RegisterRequest) => api.post<User>('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get<User>('/auth/profile/'),
};

export const exampleApi = {
  getItems: () => api.get('/items/'),
  getItemById: (id: number) => api.get(`/items/${id}/`),
  createItem: (data: any) => api.post('/items/', data),
  updateItem: (id: number, data: any) => api.put(`/items/${id}/`, data),
  deleteItem: (id: number) => api.delete(`/items/${id}/`),
};

export default {
  auth: authApi,
  example: exampleApi,
};
