import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SCREEN_NAMES } from '@/constants';
import { Colors, Sizes } from '@/constants';
import { TabBarIconProps } from '@/types';

// Import screens
import AdminHomeScreen from '@/screens/admin/AdminHomeScreen';
import AdminHistoryScreen from '@/screens/admin/AdminHistoryScreen';
import AdminProfileScreen from '@/screens/admin/AdminProfileScreen';
import AdminNotificationsScreen from '@/screens/admin/AdminNotificationsScreen';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
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
        name={SCREEN_NAMES.ADMIN_HOME}
        component={AdminHomeScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: renderTabIcon('grid-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ADMIN_HISTORY}
        component={AdminHistoryScreen}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: renderTabIcon('time-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ADMIN_NOTIFICATIONS}
        component={AdminNotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: renderTabIcon('notifications-outline'),
        }}
      />
      <Tab.Screen
        name={SCREEN_NAMES.ADMIN_PROFILE}
        component={AdminProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: renderTabIcon('person-outline'),
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabs;
