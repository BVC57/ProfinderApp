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

const UserHomeScreen = () => {
  const { user } = useAppSelector((state) => state.auth);

  const quickActions = [
    {
      id: 1,
      title: 'Find Services',
      description: 'Discover nearby professionals',
      icon: 'search-outline',
      color: Colors.primary,
    },
    {
      id: 2,
      title: 'Book Appointment',
      description: 'Schedule your next service',
      icon: 'calendar-outline',
      color: Colors.secondary,
    },
    {
      id: 3,
      title: 'Track Orders',
      description: 'Monitor your service status',
      icon: 'location-outline',
      color: Colors.warning,
    },
    {
      id: 4,
      title: 'Rate Service',
      description: 'Share your experience',
      icon: 'star-outline',
      color: Colors.info,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'Plumbing Service',
      status: 'Completed',
      date: '2 hours ago',
      amount: '$150',
    },
    {
      id: 2,
      title: 'Electrician Visit',
      status: 'In Progress',
      date: '1 day ago',
      amount: '$200',
    },
    {
      id: 3,
      title: 'Cleaning Service',
      status: 'Scheduled',
      date: 'Tomorrow',
      amount: '$80',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={Sizes.iconLg} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Services Used</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avg Rating</Text>
        </Card>
        <Card style={styles.statCard}>
          <Text style={styles.statNumber}>$1,250</Text>
          <Text style={styles.statLabel}>Total Spent</Text>
        </Card>
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
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityAmount}>{activity.amount}</Text>
            </View>
            <View style={styles.activityFooter}>
              <View style={styles.statusContainer}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: activity.status === 'Completed' ? Colors.success : 
                                    activity.status === 'In Progress' ? Colors.warning : Colors.info }
                ]} />
                <Text style={styles.activityStatus}>{activity.status}</Text>
              </View>
              <Text style={styles.activityDate}>{activity.date}</Text>
            </View>
          </Card>
        ))}
      </View>

      {/* Emergency Button */}
      <View style={styles.emergencySection}>
        <Button
          title="Emergency Service"
          onPress={() => {}}
          variant="secondary"
          style={styles.emergencyButton}
        />
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
  userName: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.textPrimary,
  },
  notificationButton: {
    padding: Sizes.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.lg,
    gap: Sizes.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Sizes.md,
  },
  statNumber: {
    fontSize: Sizes.fontSizeXxl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  statLabel: {
    fontSize: Sizes.fontSizeXs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Sizes.xs,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.sm,
  },
  activityTitle: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  activityAmount: {
    fontSize: Sizes.fontSizeMd,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Sizes.sm,
  },
  activityStatus: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
  },
  activityDate: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
  },
  emergencySection: {
    paddingHorizontal: Sizes.screenPadding,
    paddingBottom: Sizes.xl,
  },
  emergencyButton: {
    marginTop: Sizes.md,
  },
});

export default UserHomeScreen;
