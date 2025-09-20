export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AppState {
  auth: AuthState;
  ui: UIState;
}

export interface UIState {
  isLoading: boolean;
  error: string | null;
  success: string | null;
  warning: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'user' | 'admin';
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export interface TabBarIconProps {
  focused: boolean;
  color: string;
  size: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  type: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface ProfileData {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  bio?: string;
}
