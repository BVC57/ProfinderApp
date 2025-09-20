import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/hooks/redux';
import { Colors, Sizes } from '@/constants';
import Card from '@/components/Card';
import Button from '@/components/Button';

const AdminHomeScreen = () => {
  const { user } = useAppSelector((state) => state.auth);

  const dashboardStats = [
    {
      id: 1,
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: 'people-outline',
    },
    {
      id: 2,
      title: 'Active Services',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: 'construct-outline',
    },
    {
      id: 3,
      title: 'Revenue',
      value: '$45,230',
      change: '+15%',
      changeType: 'positive',
      icon: 'cash-outline',
    },
    {
      id: 4,
      title: 'Pending Reviews',
      value: '23',
      change: '-5%',
      changeType: 'negative',
      icon: 'star-outline',
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: 'people-outline',
      color: Colors.primary,
    },
    {
      id: 2,
      title: 'Service Requests',
      description: 'Review and approve services',
      icon: 'list-outline',
      color: Colors.secondary,
    },
    {
      id: 3,
      title: 'Analytics',
      description: 'View detailed analytics',
      icon: 'bar-chart-outline',
      color: Colors.warning,
    },
    {
      id: 4,
      title: 'Settings',
      description: 'Configure system settings',
      icon: 'settings-outline',
      color: Colors.info,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New User Registration',
      description: 'John Doe registered as a new user',
      time: '5 minutes ago',
      type: 'user',
    },
    {
      id: 2,
      title: 'Service Completed',
      description: 'Plumbing service completed by Mike Johnson',
      time: '1 hour ago',
      type: 'service',
    },
    {
      id: 3,
      title: 'Payment Received',
      description: 'Payment of $250 received from Sarah Wilson',
      time: '2 hours ago',
      type: 'payment',
    },
    {
      id: 4,
      title: 'Review Submitted',
      description: 'New 5-star review from David Brown',
      time: '3 hours ago',
      type: 'review',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return 'person-add-outline';
      case 'service':
        return 'checkmark-circle-outline';
      case 'payment':
        return 'card-outline';
      case 'review':
        return 'star-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user':
        return Colors.primary;
      case 'service':
        return Colors.success;
      case 'payment':
        return Colors.secondary;
      case 'review':
        return Colors.warning;
      default:
        return Colors.info;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.adminName}>{user?.name || 'Admin'}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={Sizes.iconLg} color={Colors.textPrimary} />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Dashboard Stats */}
      <View style={styles.statsContainer}>
        {dashboardStats.map((stat) => (
          <Card key={stat.id} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={Sizes.iconLg} color={Colors.primary} />
              <Text style={[
                styles.statChange,
                { color: stat.changeType === 'positive' ? Colors.success : Colors.error }
              ]}>
                {stat.change}
              </Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </Card>
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as any} size={Sizes.iconLg} color={Colors.white} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.actionDescription}>{action.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Activities */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        {recentActivities.map((activity) => (
          <Card key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIconContainer}>
                <Ionicons
                  name={getActivityIcon(activity.type) as any}
                  size={Sizes.iconMd}
                  color={getActivityColor(activity.type)}
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>

      {/* System Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Status</Text>
        <Card style={styles.systemStatusCard}>
          <View style={styles.statusItem}>
            <View style={styles.statusIndicator} />
            <Text style={styles.statusText}>All systems operational</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: Colors.success }]} />
            <Text style={styles.statusText}>Database: Online</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusIndicator, { backgroundColor: Colors.success }]} />
            <Text style={styles.statusText}>API: Responding</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
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
  greeting: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
  },
  adminName: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  notificationButton: {
    position: 'relative',
    padding: Sizes.sm,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.error,
    borderRadius: Sizes.radiusFull,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: Colors.white,
    fontSize: Sizes.fontSizeXs,
    fontWeight: 'bold',
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
    padding: Sizes.md,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  statChange: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
  },
  statValue: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  statTitle: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
  },
  section: {
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.md,
  },
  sectionTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.primary,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sizes.md,
  },
  actionCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusLg,
    padding: Sizes.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  actionIcon: {
    width: Sizes.iconXl + Sizes.md,
    height: Sizes.iconXl + Sizes.md,
    borderRadius: Sizes.radiusFull,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.sm,
  },
  actionTitle: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Sizes.xs,
  },
  actionDescription: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  activityCard: {
    marginBottom: Sizes.md,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Sizes.radiusSm,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Sizes.md,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Sizes.xs,
  },
  activityDescription: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    marginBottom: Sizes.xs,
  },
  activityTime: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.gray400,
  },
  systemStatusCard: {
    padding: Sizes.md,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: Sizes.sm,
  },
  statusText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
  },
});

export default AdminHomeScreen;
