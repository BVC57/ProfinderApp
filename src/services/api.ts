import { API_BASE_URL } from '@/constants';
import { LoginCredentials, RegisterCredentials, User } from '@/types';

// Mock API service for development
// Replace with actual API endpoints in production

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      name: credentials.email.split('@')[0],
      role: credentials.email.includes('admin') ? 'admin' : 'user',
      avatar: `https://via.placeholder.com/100x100/6366f1/ffffff?text=${credentials.email.charAt(0).toUpperCase()}`,
      phone: '+1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return {
      user: mockUser,
      token: mockToken,
    };
  },

  register: async (credentials: RegisterCredentials): Promise<{ user: User; token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful registration
    const mockUser: User = {
      id: Date.now().toString(),
      email: credentials.email,
      name: credentials.name,
      role: credentials.role,
      avatar: `https://via.placeholder.com/100x100/6366f1/ffffff?text=${credentials.name.charAt(0).toUpperCase()}`,
      phone: '+1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    return {
      user: mockUser,
      token: mockToken,
    };
  },

  logout: async (): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock successful logout
    return Promise.resolve();
  },

  refreshToken: async (token: string): Promise<{ token: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock token refresh
    return {
      token: 'refreshed-' + token,
    };
  },
};

export const userAPI = {
  getProfile: async (userId: string): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user profile
    return {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      role: 'user',
      avatar: 'https://via.placeholder.com/100x100/6366f1/ffffff?text=J',
      phone: '+1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },

  updateProfile: async (userId: string, data: Partial<User>): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock profile update
    return {
      id: userId,
      email: data.email || 'user@example.com',
      name: data.name || 'John Doe',
      role: data.role || 'user',
      avatar: data.avatar || 'https://via.placeholder.com/100x100/6366f1/ffffff?text=J',
      phone: data.phone || '+1234567890',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  },
};

export const adminAPI = {
  getDashboardStats: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      totalUsers: 2847,
      activeServices: 156,
      revenue: 45230,
      pendingReviews: 23,
    };
  },

  getUsers: async (page: number = 1, limit: number = 20) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock users list
    const users = Array.from({ length: limit }, (_, i) => ({
      id: (page - 1) * limit + i + 1,
      email: `user${(page - 1) * limit + i + 1}@example.com`,
      name: `User ${(page - 1) * limit + i + 1}`,
      role: i % 10 === 0 ? 'admin' : 'user',
      avatar: `https://via.placeholder.com/100x100/6366f1/ffffff?text=U${(page - 1) * limit + i + 1}`,
      phone: '+1234567890',
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    return {
      users,
      total: 2847,
      page,
      limit,
      totalPages: Math.ceil(2847 / limit),
    };
  },
};
