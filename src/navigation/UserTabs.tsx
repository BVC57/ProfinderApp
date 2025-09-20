import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '@/constants';
import { Colors, Sizes } from '@/constants';
import { TabBarIconProps } from '@/types';

// Import screens
import UserHomeScreen from '@/screens/user/UserHomeScreen';
import UserHistoryScreen from '@/screens/user/UserHistoryScreen';
import UserProfileScreen from '@/screens/user/UserProfileScreen';
import UserNotificationsScreen from '@/screens/user/UserNotificationsScreen';

const Tab = createBottomTabNavigator();

const UserTabs = () => {
  const renderTabIcon = (iconName: keyof typeof Ionicons.glyphMap) => 
    ({ focused, color, size }: TabBarIconProps) => (
      <Ionicons 
        name={iconName} 
        size={size} 
        color={color} 
      />
    );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: Sizes.tabBarHeight,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: Sizes.fontSizeXs,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name={SCREEN_NAMES.USER_HOME}
        component={UserHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: renderTabIcon('home-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.USER_HISTORY}
        component={UserHistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: renderTabIcon('time-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.USER_NOTIFICATIONS}
        component={UserNotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: renderTabIcon('notifications-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.USER_PROFILE}
        component={UserProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderTabIcon('person-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserTabs;
