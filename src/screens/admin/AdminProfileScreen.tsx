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

const AdminProfileScreen = () => {
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

  const adminMenuItems = [
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
      title: 'User Management',
      icon: 'people-outline',
      onPress: () => {},
    },
    {
      id: 4,
      title: 'Service Management',
      icon: 'construct-outline',
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Analytics & Reports',
      icon: 'bar-chart-outline',
      onPress: () => {},
    },
    {
      id: 6,
      title: 'System Settings',
      icon: 'settings-outline',
      onPress: () => {},
    },
    {
      id: 7,
      title: 'Security Settings',
      icon: 'shield-outline',
      onPress: () => {},
    },
    {
      id: 8,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      onPress: () => {},
    },
    {
      id: 9,
      title: 'About',
      icon: 'information-circle-outline',
      onPress: () => {},
    },
  ];

  const adminStats = [
    { label: 'Users Managed', value: '2,847', icon: 'people-outline' },
    { label: 'Services Approved', value: '1,234', icon: 'checkmark-circle-outline' },
    { label: 'Revenue Generated', value: '$45,230', icon: 'cash-outline' },
    { label: 'Admin Since', value: '2023', icon: 'calendar-outline' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: user?.avatar || 'https://via.placeholder.com/100x100/10b981/ffffff?text=A',
            }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <Ionicons name="camera-outline" size={Sizes.iconSm} color={Colors.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.userName}>{user?.name || 'Admin Name'}</Text>
        <Text style={styles.userEmail}>{user?.email || 'admin@example.com'}</Text>
        <View style={styles.roleContainer}>
          <Ionicons name="shield-checkmark-outline" size={Sizes.iconSm} color={Colors.secondary} />
          <Text style={styles.userRole}>Administrator</Text>
        </View>
        
        <Button
          title="Edit Profile"
          onPress={() => setIsEditing(true)}
          variant="outline"
          size="small"
          style={styles.editButton}
        />
      </View>

      {/* Admin Stats */}
      <View style={styles.statsContainer}>
        {adminStats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Ionicons name={stat.icon as any} size={Sizes.iconLg} color={Colors.secondary} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </Card>
        ))}
      </View>

      {/* Admin Menu Items */}
      <View style={styles.menuContainer}>
        {adminMenuItems.map((item) => (
          <TouchableOpacity key={item.id} style={styles.menuItem} onPress={item.onPress}>
            <View style={styles.menuItemLeft}>
              <View style={styles.menuIconContainer}>
                <Ionicons name={item.icon as any} size={Sizes.iconMd} color={Colors.secondary} />
              </View>
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={Sizes.iconSm} color={Colors.gray400} />
          </TouchableOpacity>
        ))}
      </View>

      {/* System Information */}
      <Card style={styles.systemInfoCard}>
        <Text style={styles.systemInfoTitle}>System Information</Text>
        <View style={styles.systemInfoItem}>
          <Text style={styles.systemInfoLabel}>App Version</Text>
          <Text style={styles.systemInfoValue}>1.0.0</Text>
        </View>
        <View style={styles.systemInfoItem}>
          <Text style={styles.systemInfoLabel}>Last Updated</Text>
          <Text style={styles.systemInfoValue}>2024-01-15</Text>
        </View>
        <View style={styles.systemInfoItem}>
          <Text style={styles.systemInfoLabel}>Server Status</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusIndicator} />
            <Text style={styles.systemInfoValue}>Online</Text>
          </View>
        </View>
      </Card>

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
    borderColor: Colors.secondary,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.secondary,
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
    marginBottom: Sizes.sm,
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.lg,
  },
  userRole: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.secondary,
    fontWeight: '600',
    marginLeft: Sizes.xs,
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
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.md,
  },
  menuItemText: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  systemInfoCard: {
    marginHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.lg,
  },
  systemInfoTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },
  systemInfoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  systemInfoLabel: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
  },
  systemInfoValue: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: Sizes.sm,
  },
  logoutContainer: {
    paddingHorizontal: Sizes.screenPadding,
    paddingBottom: Sizes.xl,
  },
  logoutButton: {
    borderColor: Colors.error,
  },
});

export default AdminProfileScreen;
