export { Colors, Gradients } from './colors';
export { Sizes } from './sizes';

export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api' 
  : 'https://your-production-api.com/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  NOTIFICATION_SETTINGS: 'notification_settings',
} as const;

export const SCREEN_NAMES = {
  // Auth screens
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // User screens
  USER_HOME: 'UserHome',
  USER_HISTORY: 'UserHistory',
  USER_PROFILE: 'UserProfile',
  USER_NOTIFICATIONS: 'UserNotifications',
  
  // Admin screens
  ADMIN_HOME: 'AdminHome',
  ADMIN_HISTORY: 'AdminHistory',
  ADMIN_PROFILE: 'AdminProfile',
  ADMIN_NOTIFICATIONS: 'AdminNotifications',
  
  // Tab navigators
  USER_TABS: 'UserTabs',
  ADMIN_TABS: 'AdminTabs',
  
  // Stack navigators
  AUTH_STACK: 'AuthStack',
  MAIN_STACK: 'MainStack',
} as const;

export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
} as const;
