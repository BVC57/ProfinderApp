import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizes } from '@/constants';
import Card from '@/components/Card';
import Button from '@/components/Button';

const AdminHistoryScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'users' | 'services' | 'payments'>('all');

  const adminHistoryData = [
    {
      id: '1',
      type: 'user',
      title: 'New User Registration',
      description: 'John Doe registered as a new user',
      date: '2024-01-15 10:30 AM',
      status: 'completed',
      details: 'User ID: #12345, Email: john@example.com',
    },
    {
      id: '2',
      type: 'service',
      title: 'Service Request Approved',
      description: 'Plumbing service request approved for Sarah Wilson',
      date: '2024-01-15 09:15 AM',
      status: 'completed',
      details: 'Service ID: #SR-789, Amount: $150',
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Processed',
      description: 'Payment of $250 processed successfully',
      date: '2024-01-14 3:45 PM',
      status: 'completed',
      details: 'Transaction ID: #TXN-456, Method: Credit Card',
    },
    {
      id: '4',
      type: 'user',
      title: 'User Account Suspended',
      description: 'Account suspended for policy violation',
      date: '2024-01-14 2:20 PM',
      status: 'completed',
      details: 'User ID: #12340, Reason: Spam',
    },
    {
      id: '5',
      type: 'service',
      title: 'Service Cancelled',
      description: 'Cleaning service cancelled by user',
      date: '2024-01-13 11:10 AM',
      status: 'cancelled',
      details: 'Service ID: #SR-788, Refund: $80',
    },
    {
      id: '6',
      type: 'payment',
      title: 'Refund Processed',
      description: 'Refund of $80 processed to user account',
      date: '2024-01-13 11:30 AM',
      status: 'completed',
      details: 'Transaction ID: #TXN-455, Amount: $80',
    },
  ];

  const filteredHistory = adminHistoryData.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'user':
        return 'person-outline';
      case 'service':
        return 'construct-outline';
      case 'payment':
        return 'card-outline';
      default:
        return 'information-circle-outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'user':
        return Colors.primary;
      case 'service':
        return Colors.secondary;
      case 'payment':
        return Colors.success;
      default:
        return Colors.info;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return Colors.success;
      case 'cancelled':
        return Colors.error;
      case 'pending':
        return Colors.warning;
      default:
        return Colors.gray500;
    }
  };

  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'users', label: 'Users' },
    { key: 'services', label: 'Services' },
    { key: 'payments', label: 'Payments' },
  ] as const;

  const exportData = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin History</Text>
        <TouchableOpacity style={styles.exportButton} onPress={exportData}>
          <Ionicons name="download-outline" size={Sizes.iconMd} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Search and Filters */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={Sizes.iconMd} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search admin actions..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.gray400}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={Sizes.iconMd} color={Colors.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filterButtons.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterButton,
              selectedFilter === filter.key && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter.key)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === filter.key && styles.activeFilterButtonText,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* History List */}
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {filteredHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-outline" size={Sizes.iconXl * 2} color={Colors.gray300} />
            <Text style={styles.emptyStateTitle}>No actions found</Text>
            <Text style={styles.emptyStateText}>
              {searchQuery ? 'Try adjusting your search terms' : 'Admin actions will appear here'}
            </Text>
          </View>
        ) : (
          filteredHistory.map((item) => (
            <Card key={item.id} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <View style={styles.historyTitleContainer}>
                  <View style={styles.typeContainer}>
                    <Ionicons
                      name={getTypeIcon(item.type) as any}
                      size={Sizes.iconSm}
                      color={getTypeColor(item.type)}
                    />
                    <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Text>
                  </View>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                </View>
                <View style={styles.statusContainer}>
                  <View style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(item.status) }
                  ]} />
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.historyDescription}>{item.description}</Text>
              <Text style={styles.historyDetails}>{item.details}</Text>
              
              <View style={styles.historyFooter}>
                <View style={styles.dateContainer}>
                  <Ionicons name="time-outline" size={Sizes.iconSm} color={Colors.gray400} />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                  <Ionicons name="chevron-forward" size={Sizes.iconSm} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </Card>
          ))
        )}
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
  exportButton: {
    padding: Sizes.sm,
  },
  searchContainer: {
    paddingHorizontal: Sizes.screenPadding,
    marginBottom: Sizes.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Sizes.radiusMd,
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: Sizes.sm,
    fontSize: Sizes.fontSizeMd,
    color: Colors.textPrimary,
  },
  filterContainer: {
    marginBottom: Sizes.md,
  },
  filterContent: {
    paddingHorizontal: Sizes.screenPadding,
    gap: Sizes.sm,
  },
  filterButton: {
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.sm,
    borderRadius: Sizes.radiusFull,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: Colors.white,
  },
  historyContainer: {
    flex: 1,
    paddingHorizontal: Sizes.screenPadding,
  },
  historyCard: {
    marginBottom: Sizes.md,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Sizes.sm,
  },
  historyTitleContainer: {
    flex: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizes.xs,
  },
  typeText: {
    fontSize: Sizes.fontSizeXs,
    fontWeight: '600',
    marginLeft: Sizes.xs,
    textTransform: 'uppercase',
  },
  historyTitle: {
    fontSize: Sizes.fontSizeLg,
    fontWeight: '600',
    color: Colors.textPrimary,
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
  statusText: {
    fontSize: Sizes.fontSizeSm,
    fontWeight: '600',
  },
  historyDescription: {
    fontSize: Sizes.fontSizeMd,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Sizes.sm,
  },
  historyDetails: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.gray500,
    fontStyle: 'italic',
    marginBottom: Sizes.md,
  },
  historyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.textSecondary,
    marginLeft: Sizes.xs,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: Sizes.fontSizeSm,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: Sizes.xs,
  },
  emptyState: {
    flex: 1,
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

export default AdminHistoryScreen;
