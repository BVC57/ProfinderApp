import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '@/constants';
import { NotificationItem } from '@/types';
import Card from '@/components/Card';

const AdminNotificationsScreen = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'New User Registration',
      message: 'John Doe has registered as a new user. Review and approve if needed.',
      date: '5 minutes ago',
      isRead: false,
      type: 'info',
    },
    {
      id: '2',
      title: 'Service Request Pending',
      message: '3 new service requests are waiting for your approval.',
      date: '1 hour ago',
      isRead: false,
      type: 'warning',
    },
    {
      id: '3',
      title: 'Payment Processed',
      message: 'Payment of $450 has been successfully processed.',
      date: '2 hours ago',
      isRead: true,
      type: 'success',
    },
    {
      id: '4',
      title: 'System Alert',
      message: 'High server load detected. Consider scaling resources.',
      date: '3 hours ago',
      isRead: true,
      type: 'warning',
    },
    {
      id: '5',
      title: 'User Report',
      message: 'A user has reported an issue with service quality.',
      date: '1 day ago',
      isRead: true,
      type: 'error',
    },
    {
      id: '6',
      title: 'Monthly Report Ready',
      message: 'Your monthly analytics report is ready for review.',
      date: '2 days ago',
      isRead: true,
      type: 'info',
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    systemAlerts: true,
    userRegistrations: true,
    serviceRequests: true,
    paymentNotifications: true,
    userReports: true,
    securityAlerts: true,
    maintenanceAlerts: true,
    analyticsReports: false,
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'close-circle';
      default:
        return 'information-circle';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return Colors.success;
      case 'warning':
        return Colors.warning;
      case 'error':
        return Colors.error;
      default:
        return Colors.info;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Admin Notifications</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCount}>{unreadCount} unread</Text>
          )}
        </View>
        <View style={styles.headerActions}>
          {unreadCount > 0 && (
            <TouchableOpacity style={styles.actionButton} onPress={markAllAsRead}>
              <Ionicons name="checkmark-done-outline" size={Sizes.iconMd} color={Colors.primary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.actionButton} onPress={clearAllNotifications}>
            <Ionicons name="trash-outline" size={Sizes.iconMd} color={Colors.error} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Notification Settings</Text>
          
          {Object.entries(notificationSettings).map(([key, value]) => (
            <View key={key} style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Text>
                <Text style={styles.settingDescription}>
                  {key === 'systemAlerts' && 'Critical system alerts and warnings'}
                  {key === 'userRegistrations' && 'New user registration notifications'}
                  {key === 'serviceRequests' && 'Pending service request approvals'}
                  {key === 'paymentNotifications' && 'Payment processing updates'}
                  {key === 'userReports' && 'User reports and complaints'}
                  {key === 'securityAlerts' && 'Security-related notifications'}
                  {key === 'maintenanceAlerts' && 'System maintenance notifications'}
                  {key === 'analyticsReports' && 'Analytics and report notifications'}
                </Text>
              </View>
              <Switch
                value={value}
                onValueChange={(newValue) =>
                  setNotificationSettings(prev => ({ ...prev, [key]: newValue }))
                }
                trackColor={{ false: Colors.gray300, true: Colors.secondaryLight }}
                thumbColor={value ? Colors.secondary : Colors.gray400}
              />
            </View>
          ))}
        </Card>

        {/* Notifications List */}
        <View style={styles.notificationsSection}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off-outline" size={Sizes.iconXl * 2} color={Colors.gray300} />
              <Text style={styles.emptyStateTitle}>No notifications</Text>
              <Text style={styles.emptyStateText}>
                You're all caught up! New admin notifications will appear here.
              </Text>
            </View>
          ) : (
            notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[
                  styles.notificationCard,
                  !notification.isRead && styles.unreadNotification,
                ]}
                onPress={() => markAsRead(notification.id)}
              >
                <View style={styles.notificationHeader}>
                  <View style={styles.notificationIconContainer}>
                    <Ionicons
                      name={getNotificationIcon(notification.type) as any}
                      size={Sizes.iconMd}
                      color={getNotificationColor(notification.type)}
                    />
                  </View>
                  <View style={styles.notificationContent}>
                    <Text style={[
                      styles.notificationTitle,
                      !notification.isRead && styles.unreadText,
                    ]}>
                      {notification.title}
                    </Text>
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    <Text style={styles.notificationDate}>
                      {notification.date}
                    </Text>
                  </View>
                  {!notification.isRead && (
                    <View style={styles.unreadDot} />
                  )}
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.screenPadding,
    paddingTop: Sizes.xl,
  },
  title: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  unreadCount: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.secondary,
    fontWeight: '600',
    marginTop: Sizes.xs,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Sizes.sm,
  },
  actionButton: {
    padding: Sizes.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.screenPadding,
  },
  settingsCard: {
    marginBottom: Sizes.lg,
  },
  sectionTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Sizes.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  settingInfo: {
    flex: 1,
    marginRight: Sizes.md,
  },
  settingLabel: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  settingDescription: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  notificationsSection: {
    marginBottom: Sizes.xl,
  },
  notificationCard: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusMd,
    padding: Sizes.md,
    marginBottom: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.secondary,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Sizes.radiusSm,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.md,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  unreadText: {
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Sizes.xs,
  },
  notificationDate: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.gray400,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginLeft: Sizes.sm,
    marginTop: Sizes.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.xxl * 2,
  },
  emptyStateTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Sizes.lg,
    marginBottom: Sizes.sm,
  },
  emptyStateText: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: Sizes.xl,
  },
});

export default AdminNotificationsScreen;
