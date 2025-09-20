# ProfinderApp - React Native Expo App

A comprehensive React Native application built with Expo, featuring role-based authentication, state management with Redux Toolkit, and a modern UI design.

## Features

### 🔐 Authentication System
- **Role-based Access Control**: Separate interfaces for Users and Admins
- **Secure Login/Registration**: Form validation with Yup
- **Persistent Authentication**: Token-based auth with AsyncStorage
- **Auto-login**: Restores user session on app restart

### 👤 User Features
- **Home Dashboard**: Quick actions, stats, and recent activities
- **Service History**: Track all past and current services
- **Profile Management**: Edit profile, change password, settings
- **Notifications**: Real-time notifications with settings

### 👨‍💼 Admin Features
- **Admin Dashboard**: System stats, user management, analytics
- **User Management**: View and manage user accounts
- **Service Management**: Approve and monitor services
- **System Monitoring**: Real-time system status and alerts

### 🎨 UI/UX Features
- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Optimized for all screen sizes
- **Dark/Light Theme**: Consistent color scheme
- **Smooth Animations**: Enhanced user experience
- **Error Handling**: Comprehensive error messages and loading states

### 🛠 Technical Features
- **TypeScript**: Full type safety
- **Redux Toolkit**: Centralized state management
- **React Navigation**: Seamless navigation
- **Form Validation**: Yup schema validation
- **Toast Notifications**: User feedback system
- **Async Storage**: Data persistence

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **Expo Go app** on your mobile device (for testing)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProfinderApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - **iOS**: Press `i` in the terminal or scan QR code with Camera app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── LoadingScreen.tsx
├── constants/           # App constants and configuration
│   ├── colors.ts
│   ├── sizes.ts
│   └── index.ts
├── hooks/              # Custom React hooks
│   └── redux.ts
├── navigation/         # Navigation configuration
│   ├── AppNavigator.tsx
│   ├── AuthStack.tsx
│   ├── UserTabs.tsx
│   ├── AdminTabs.tsx
│   └── MainStack.tsx
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   ├── user/          # User-specific screens
│   └── admin/         # Admin-specific screens
├── services/          # API services
│   └── api.ts
├── store/             # Redux store configuration
│   ├── authSlice.ts
│   ├── uiSlice.ts
│   └── index.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── utils/             # Utility functions
    └── validation.ts
```

## Usage

### Authentication

1. **Registration**: New users can register with email, password, and role selection
2. **Login**: Existing users can log in with email and password
3. **Role-based Access**: 
   - **Users**: Access to service booking, history, and profile
   - **Admins**: Access to dashboard, user management, and system settings

### Testing Credentials

For testing purposes, you can use these mock credentials:

**User Account:**
- Email: `user@example.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

### Navigation

- **Bottom Tab Navigation**: 4 tabs for both User and Admin roles
  - Home/Dashboard
  - History
  - Notifications
  - Profile

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
API_BASE_URL=http://localhost:3000/api
EXPO_PUBLIC_API_URL=https://your-api-url.com/api
```

### App Configuration

Update `app.json` for production:

```json
{
  "expo": {
    "name": "ProfinderApp",
    "slug": "profinder-app",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.profinder"
    },
    "android": {
      "package": "com.yourcompany.profinder"
    }
  }
}
```

## Building for Production

### Android

```bash
# Build APK
expo build:android

# Build AAB (recommended for Play Store)
expo build:android -t app-bundle
```

### iOS

```bash
# Build for iOS (requires macOS)
expo build:ios
```

### Web

```bash
# Build for web
expo build:web
```

## Dependencies

### Core Dependencies
- **@expo/vector-icons**: Icon library
- **@react-navigation/native**: Navigation
- **@react-navigation/bottom-tabs**: Bottom tab navigation
- **@react-navigation/stack**: Stack navigation
- **@reduxjs/toolkit**: State management
- **react-redux**: React-Redux bindings
- **react-hook-form**: Form handling
- **@hookform/resolvers**: Form validation resolvers
- **yup**: Schema validation
- **react-native-toast-message**: Toast notifications

### Expo Dependencies
- **expo-secure-store**: Secure storage
- **expo-constants**: App constants
- **expo-status-bar**: Status bar management
- **expo-splash-screen**: Splash screen
- **@react-native-async-storage/async-storage**: Async storage

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **Metro bundler issues**: Clear cache with `expo start -c`
2. **Dependency conflicts**: Delete `node_modules` and reinstall
3. **iOS build issues**: Ensure Xcode is properly configured
4. **Android build issues**: Check Android SDK and build tools

### Performance Optimization

- Use React.memo for expensive components
- Implement lazy loading for screens
- Optimize images and assets
- Use FlatList for large lists
- Implement proper error boundaries

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

- [ ] Push notifications
- [ ] Offline support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Payment integration
- [ ] Real-time chat
- [ ] Advanced search and filters
- [ ] Social features

---

**Built with ❤️ using React Native, Expo, and TypeScript**
