import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREEN_NAMES } from '@/constants';
import UserTabs from './UserTabs';
import AdminTabs from './AdminTabs';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#ffffff' },
      }}
    >
      <Stack.Screen name={SCREEN_NAMES.USER_TABS} component={UserTabs} />
      <Stack.Screen name={SCREEN_NAMES.ADMIN_TABS} component={AdminTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;
