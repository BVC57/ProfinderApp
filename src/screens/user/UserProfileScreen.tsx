import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { logoutUser } from '@/store/authSlice';
import { Colors, Sizes } from '@/constants';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Toast from 'react-native-toast-message';

const UserProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(logoutUser()).unwrap();
              Toast.show({
                type: 'success',
                text1: 'Logged Out',
                text2: 'You have been successfully logged out',
              });
            } catch (error: any) {
              Toast.show({
                type: 'error',
                text1: 'Logout Failed',
                text2: error || 'Please try again',
              });
            }
          },
        },
      ]
    );
  };

  const profileMenuItems = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'person-outline',
      onPress: () => setIsEditing(true),
    },
    {
      id: 2,
      title: 'Change Password',
      icon: 'lock-closed-outline',
      onPress: () => {},
    },
    {
      id: 3,
      title: 'Payment Methods',
      icon: 'card-outline',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Notifications',
      icon: 'notifications-outline',
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Privacy Settings',
      icon: 'shield-outline',
      onPress: () => {},
    },
    {
      id: 6,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      id: 7,
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {},
    },
  ];

  const statsData = [
    { label: 'Services Used', value: '24', icon: 'checkmark-circle-outline' },
    { label: 'Total Spent', value: '$2,450', icon: 'cash-outline' },
    { label: 'Avg Rating', value: '4.8', icon: 'star-outline' },
    { label: 'Member Since', value: '2023', icon: 'calendar-outline' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: user?.avatar || 'https://via.placeholder.com/100x100/6366f1/ffffff?text=U',
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera-outline" size={Sizes.iconSm} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{user?.name || 'User Name'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        <Text style={styles.userRole}>Regular User</Text>
        
        <Button
          title="Edit Profile"
          onPress={() => setIsEditing(true)}
          variant="outline"
          size="small"
          style={styles.editButton}
        />
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Ionicons name={stat.icon as any} size={Sizes.iconLg} color={Colors.primary} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {profileMenuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={Sizes.iconMd} color={Colors.primary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={Sizes.iconSm} color={Colors.gray400} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
          style={styles.logoutButton}
        />
      </View>

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileHeader: {
    alignItems: 'center',
    padding: Sizes.screenPadding,
    paddingTop: Sizes.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Sizes.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.radiusFull,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.white,
  },
  userName: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  userEmail: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    marginBottom: Sizes.xs,
  },
  userRole: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: Sizes.lg,
  },
  editButton: {
    width: 120,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.lg,
    gap: Sizes.md,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: Sizes.md,
  },
  statValue: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginTop: Sizes.sm,
    marginBottom: Sizes.xs,
  },
  statLabel: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  menuContainer: {
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
    borderRadius: Sizes.radiusMd,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Sizes.radiusSm,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.md,
  },
  menuItemText: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  logoutContainer: {
    paddingHorizontal: Sizes.screenPadding,
    paddingBottom: Sizes.xl,
  },
  logoutButton: {
    borderColor: Colors.error,
  },
});

export default UserProfileScreen;
