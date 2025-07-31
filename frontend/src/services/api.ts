import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    
    const response = await this.client.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  }

  async register(userData: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }

  // User endpoints
  async getCurrentUser() {
    const response = await this.client.get('/users/me');
    return response.data;
  }

  async updateUser(userData: {
    name?: string;
    email?: string;
    phone?: string;
  }) {
    const response = await this.client.put('/users/me', userData);
    return response.data;
  }

  async getUserStats() {
    const response = await this.client.get('/users/me/stats');
    return response.data;
  }

  async getUserCheckins(limit = 50) {
    const response = await this.client.get(`/users/me/checkins?limit=${limit}`);
    return response.data;
  }

  // Gym endpoints
  async getGyms(params?: {
    lat?: number;
    lon?: number;
    radius?: number;
    limit?: number;
  }) {
    const response = await this.client.get('/gyms', { params });
    return response.data;
  }

  async searchGyms(query: string, params?: {
    lat?: number;
    lon?: number;
    limit?: number;
  }) {
    const response = await this.client.get('/gyms/search', {
      params: { q: query, ...params }
    });
    return response.data;
  }

  async getGym(id: number) {
    const response = await this.client.get(`/gyms/${id}`);
    return response.data;
  }

  // Check-in endpoints
  async createCheckin(gymId: number) {
    const response = await this.client.post('/checkins', { gym_id: gymId });
    return response.data;
  }

  async checkout(checkinId: number) {
    const response = await this.client.post('/checkins/checkout', {
      checkin_id: checkinId
    });
    return response.data;
  }

  async getActiveCheckin() {
    const response = await this.client.get('/checkins/active');
    return response.data;
  }

  async getCheckins(limit = 50) {
    const response = await this.client.get(`/checkins?limit=${limit}`);
    return response.data;
  }

  // Utility methods
  setAuthToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  clearAuthToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}

export const apiService = new ApiService();
export default apiService;
