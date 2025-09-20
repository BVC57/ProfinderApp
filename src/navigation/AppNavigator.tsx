import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { loadStoredAuth } from '@/store/authSlice';
import { SCREEN_NAMES } from '@/constants';
import AuthStack from './AuthStack';
import UserTabs from './UserTabs';
import AdminTabs from './AdminTabs';
import LoadingScreen from '@/components/LoadingScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Load stored authentication data on app start
    dispatch(loadStoredAuth());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // User is authenticated, show role-based navigation
          user?.role === 'admin' ? (
            <Stack.Screen name={SCREEN_NAMES.ADMIN_TABS} component={AdminTabs} />
          ) : (
            <Stack.Screen name={SCREEN_NAMES.USER_TABS} component={UserTabs} />
          )
        ) : (
          // User is not authenticated, show auth stack
          <Stack.Screen name={SCREEN_NAMES.AUTH_STACK} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
